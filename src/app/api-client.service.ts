import { Injectable } from '@angular/core'
import { CacheService } from './cache.service'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ApiToken } from "./models/api-token.model";
import { CookieService } from "ngx-cookie-service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductModel } from './product/product.model';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { catchError, Subject, throwError } from 'rxjs';
import { map } from "rxjs";
import { Byte } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private urlBase: string = "http://localhost:8081/";
  public isLoggedInObservable = new Subject<boolean>();
  public isAdminObservable = new Subject<boolean>();

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private sanitizer: DomSanitizer,
    private _cacheService: CacheService) {
    this.isLoggedInObservable.next(this.isLoggedIn());
    this.isAdminObservable.next(this.isAdmin());
  }

  getTokenData(): ApiToken {
    var token = this.cookieService.get('Auth');
    if (!token)
      return null as any;

    var tokenObj = JSON.parse(token);
    return <ApiToken>tokenObj;
  }

  setTokenData(apiToken: ApiToken): void {
    this.cookieService.set("Auth", JSON.stringify(apiToken));
  }

  deleteTokenData(): void {
    this.cookieService.delete('Auth');
  }

  isLoggedIn(): boolean {
    var token = this.getTokenData();
    if (token == null)
      return false;

    var decoded = jwtDecode<JwtPayload>(token.accessToken);
    if (decoded == null || decoded.exp == null)
      return false;

    const expired = Date.now() >= decoded.exp * 1000;

    if (expired)
      return false;

    console.log("Logged in!");
    return true;
  }

  isAdmin(): boolean {
    var token = this.getTokenData();
    if (token == null)
      return false;

    if (token.role == "Admin")
      return true;

    return false;

  }

  getRequestHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getTokenData().accessToken
    })
  }

  login(userData: { username: string, password: string }): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.http
        .post<ApiToken>(this.urlBase + "user/signin", userData)
        .pipe(catchError(error => {
          return throwError(() => error);
        }))
        .subscribe({
          error: error => {
            rej(error);
            this.updateObservables();
          },
          next: responseData => {
            this.updateObservables();
            this.setTokenData(responseData);
            res(true);
          }
        })
    });
  }

  getAllProducts() {
    return this.get<ProductModel[]>({
      url: this.urlBase + "product",
      cacheMins: 5,
      idSpec: 'id',
      requestType: 'all',
      cacheid: 'product'
    })
      .pipe(
        map((response: ProductModel[]) => {
          return response;
        }
        )
      )
  }

  getProduct(id: string) {
    return this.get<ProductModel>({
      url: `${this.urlBase}product/${id}`,
      cacheMins: 5,
      idSpec: 'id',
      requestType: 'single',
      idValue: id,
      cacheid: 'product'
    })
      .pipe(
        map((response: ProductModel) => {
          return response;
        }
        )
      )
  }

  postProduct(product: ProductModel): Promise<ProductModel> {
    return new Promise<ProductModel>((succ, rej) => this.post<ProductModel>({
      url: `${this.urlBase}product`,
      body: product,
      cacheMins: 0,
      cacheid: 'product',
      requestType: 'single'
    }, this.getRequestHeader()).subscribe({
      next: result => {
        succ(result);
      },
      error: error => {
        rej(error)
      }
    })
    );
  }

  byteToBlob(file: Blob): SafeUrl {
    const mediaType = 'application/image';
    const blob = new Blob([file], { type: mediaType });
    var unsafeImageUrl = URL.createObjectURL(blob);
    var imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);

    return imageUrl;
  }

  private updateObservables(): void {
    this.isLoggedInObservable.next(this.isLoggedIn());
    this.isAdminObservable.next(this.isAdmin());
  }

  private get<T>(options: HttpOptions, headers?: HttpHeaders): Observable<T> {
    return this.httpCall(Verbs.GET, options, headers)
  }

  private delete<T>(options: HttpOptions, headers?: HttpHeaders): Observable<T> {
    return this.httpCall(Verbs.DELETE, options, headers)
  }

  private post<T>(options: HttpOptions, headers?: HttpHeaders): Observable<T> {
    return this.httpCall(Verbs.POST, options, headers)
  }

  private put<T>(options: HttpOptions, headers?: HttpHeaders): Observable<T> {
    return this.httpCall(Verbs.PUT, options, headers)
  }

  private httpCall<T>(verb: Verbs, options: HttpOptions, headers?: HttpHeaders): Observable<T> {

    // Setup default values
    options.body = options.body || null
    options.cacheMins = options.cacheMins || 0

    if (options.cacheMins > 0) {
      // Get data from cache
      var data: any;

      if (options.requestType === 'single' && options.idValue != undefined) {
        data = this._cacheService.load(options.cacheid, options.idValue)
      } else if (options.requestType === 'all' && options.cacheid != undefined) {
        data = this._cacheService.load(options.cacheid, undefined)
      } else {
        data = this._cacheService.load(options.url)
      }

      // Return data from cache
      if (data !== null) {
        return of<T>(data)
      }
    }

    return this.http.request<any>(verb, options.url, {
      body: options.body,
      headers: headers
    })
      .pipe(
        switchMap(response => {
          if (options.cacheMins ?? 0 > 0) {
            if (options.requestType == 'single' && options.idValue != undefined) {
              this._cacheService.save({
                group: options.cacheid,
                key: options.idValue,
                data: response,
                expirationMins: options.cacheMins
              })
            } else if (
              options.requestType == 'all'
              && options.cacheid != undefined
              && options.idSpec != undefined
              && Array.isArray(response)) {
              for (let item of response) {
                this._cacheService.save({
                  group: options.cacheid,
                  key: item[options.idSpec],
                  data: item,
                  expirationMins: options.cacheMins
                })
              }
            } else {
              this._cacheService.save({
                group: options.cacheid,
                key: options.url,
                data: response,
                expirationMins: options.cacheMins
              })
            }

          }
          return of<T>(response)
        })
      )
  }
}

export class HttpOptions {
  url: string
  body?: any
  cacheMins?: number
  idSpec?: string
  requestType: string
  idValue?: string
  cacheid: string
}

export enum Verbs {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}