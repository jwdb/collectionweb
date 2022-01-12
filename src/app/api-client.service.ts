import { Injectable } from '@angular/core';
import { ApiToken } from "./models/api-token.model";
import {map} from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductModel } from './product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private urlBase: string = "http://localhost:8081/";

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private sanitizer:DomSanitizer) {
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
                        rej(error);
                    },
                    next: responseData => {
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
}

