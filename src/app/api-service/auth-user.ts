import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { CookieService } from 'ngx-cookie-service';
import { environment as env } from '../../environment/environment';
import { httpRequestHeadersReceiveJson, httpRequestHeadersSendReceiveJson } from '../model/tools';
import { LoginField } from '../model/login-field';
import { RegisterUser } from '../model/register-user';
import { Token } from '../model/token';


@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  private http= inject(HttpClient);
  private cookie= inject(CookieService);


  public verifyQR_hearoAccessAccount(qr_image_blob: any): Observable<any|Token>{
    const formData= new FormData();
    formData.append('image', qr_image_blob, 'image.png');

    return this.http.post<any|Token>(
      `${env.API_DOMAIN}api/token/qr/`,
      formData,{
        headers: httpRequestHeadersReceiveJson,
        observe: 'body'
      }
    )
  }
  public getTokenViaRefresh(refreshToken: string): Observable<any|Token>{
    return this.http.post<any|Token>(
      `${env.API_DOMAIN}api/token/refresh/`,
      { "refresh": refreshToken },{
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }
  public verifyToken(accessToken: string): Observable<any>{
    return this.http.post<any>(
      `${env.API_DOMAIN}api/token/verify/`,
      {"token": accessToken},
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }








  /* ------------------------------------------------ */
  /* account hearo-team crud */
  public createHearoAccount(hearoUser: RegisterUser): Observable<any>{
    let token: Token= this.getToken_AccessQRAccount()==null? {
      access: '',
      refresh: ''
    }: this.getToken_AccessQRAccount()!;
    if( token.access=='' ){
      throw new TypeError("Access token for QR access account can't be empty");
    }
    return this.http.post<any>(
      `${env.API_DOMAIN}api/v1/hearo-teams/`,
      {
          "user": {
              "email": hearoUser.email,
              "username": hearoUser.username,
              "password": hearoUser.password,
              "first_name": hearoUser.first_name,
              "last_name": hearoUser.last_name
          },
          /* "is_access_account": false, onCreateForceFalse onBackEnd API */
      },{
          headers: httpRequestHeadersSendReceiveJson.set("Authorization", `Bearer ${token.access}`),
          observe: 'body',
          credentials: 'include'
      },
    );
  }








  /* ------------------------------------------------ */
  /* access/refresh token management to API on back-end */
  public userLogin(hearoUser: LoginField): Observable<Token|any>{
    return this.http.post<Token|any>(
      `${env.API_DOMAIN}api/token/`,
      hearoUser,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    );
  }








  /* ------------------------------------------------ */
  /* QR access account access/refresh token on cookie web browser set/get */
  public saveToken_AccessQRAccount(token: Token): void{
    /* cookie is 5 days to expire */
    this.cookie.set('qr_access_token', token.access, {
      expires: 5,
      path: '/'
    });
    this.cookie.set('qr_access_token_refresh', token.refresh, {
      expires: 5,
      path: '/'
    });
  }
  public getToken_AccessQRAccount(): Token|null{
    const token: Token= {
      access: String(this.cookie.get('qr_access_token')),
      refresh: String(this.cookie.get('qr_access_token_refresh'))
    }
    if( token.access=="" || token.access==null || token.access.length==0 ||
      token.refresh=="" || token.refresh==null || token.refresh.length==0 ){
      return null;
    }
    return token;
  }








  /* ------------------------------------------------ */
  /* access/refresh token on cookie web browser set/get */
  public saveAccountToken(token: Token): void{
    /* cookie is 5 days to expire */
    this.cookie.set('account_token', token.access, {
      expires: 5,
      path: '/'
    });
    this.cookie.set('account_token_refresh', token.refresh, {
      expires: 5,
      path: '/'
    });
  }
  public getAccountToken(): Token|null{
    const token: Token= {
      access: String(this.cookie.get('account_token')),
      refresh: String(this.cookie.get('account_token_refresh'))
    }
    if( token.access=="" || token.access==null || token.access.length==0 ||
      token.refresh=="" || token.refresh==null || token.refresh.length==0 ){
      return null;
    }
    return token;
  }
}
