import { Injectable } from '@angular/core';
import { ApiToken } from "./models/api-token.model";
import { CookieService } from "ngx-cookie-service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductModel } from './product/product.model';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Subject } from 'rxjs';
import {map} from "rxjs";
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
    private sanitizer:DomSanitizer) {
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

  isLoggedIn() : boolean {
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

  isAdmin() : boolean {
    var token = this.getTokenData();
    if (token == null)
      return false;

    if (token.role == "Admin")
      return true;

    return false;

  }

  getRequestHeader() : HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getTokenData().accessToken
    })
  }

  login(userData: { username: string, password: string }): Promise<boolean> {
        return new Promise<boolean>((res, rej) => {
            this.http
                .post<ApiToken>(this.urlBase + "user/signin", userData)
                .subscribe({
                    error: error => {
                      this.updateObservables();
                      rej(error);
                    },
                    next: responseData => {
                      this.updateObservables();
                      this.setTokenData(responseData);
                      res(true);
                    }
                })
        });
    }

    getAllProducts(){
      return this.http.get<ProductModel[]>(this.urlBase+ "product")
        .pipe(
          map((response: ProductModel[]) => {
              return response;
            }
          )
        )
    }

    getProduct(id: string){
      return this.http.get<ProductModel>(`${this.urlBase}product/${id}`)
        .pipe(
          map((response: ProductModel) => {
              return response;
            }
          )
        )
    }

    byteToBlob(file: Blob) : SafeUrl {
      const mediaType = 'application/image';
      const blob = new Blob([file], { type: mediaType });
      var unsafeImageUrl = URL.createObjectURL(blob);
      var imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);

      return imageUrl;
    }

    private updateObservables() : void {
      console.log("updating Observables!");
      this.isLoggedInObservable.next(this.isLoggedIn());
      this.isAdminObservable.next(this.isAdmin());
    }
}

