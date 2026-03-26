import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie-service';
import { environment as env } from '../../environment/environment';
import { httpRequestHeadersReceiveJson, httpRequestHeadersSendReceiveJson } from '../model/tools';
import { LoginField } from '../model/login-field';
import { Token } from '../model/token';
import { ForgotPasswordField, ForgotPasswordResponse, HearoTeamGetWithIdResponse, RegisterUser, ResetPasswordField } from '../model/account';


@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  private http= inject(HttpClient);
  private cookie= inject(CookieService);
  private router= inject(Router);








  /* ------------------------------------------------ */
  /* access/refresh token management to API on back-end */
  public verifyQR_hearoAccessAccountHttpPost(qr_image_blob: any): Observable<any|Token>{
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
  public userLoginHttpPost(hearoUser: LoginField): Observable<Token|any>{
    return this.http.post<Token|any>(
      `${env.API_DOMAIN}api/token/`,
      hearoUser,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    );
  }
  public forgotPasswordHttpPost(forgotPassword: ForgotPasswordField): Observable<ForgotPasswordResponse>{
    return this.http.post<ForgotPasswordResponse>(
      `${env.API_DOMAIN}api/forgot-password/`,
      forgotPassword,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    );
  }
  public resetPasswordHttpPost(resetpw: ResetPasswordField, apiPath: string): Observable<any>{
    return this.http.post<any>(
      `${env.API_DOMAIN}${apiPath}`,
      {
        'password': resetpw.password
      },{
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }
  private __qrAccessLogoutHttpPatch(): Observable<any>{
    /* needs refresh_token */
    const authToken: Token|null= this.getToken_AccessQRAccount();
    if( authToken!=null ){
      return this.http.patch<Token|any>(
      `${env.API_DOMAIN}api/token/`,
        {'refresh_token': authToken.refresh},
        {
          headers: httpRequestHeadersSendReceiveJson.set('Authorization', `Bearer ${authToken.access}`),
          observe: 'body'
        }
      );
    }
    return this.http.patch<Token|any>(
      `${env.API_DOMAIN}api/token/`,
      {'refresh_token': ''},
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    );
  }
  private __userLogoutHttpPatch(): Observable<any>{
    /* needs refresh_token */
    const authToken: Token|null= this.getAccountToken();
    if( authToken!=null ){
      return this.http.patch<Token|any>(
      `${env.API_DOMAIN}api/token/`,
        {'refresh_token': authToken.refresh},
        {
          headers: httpRequestHeadersSendReceiveJson.set('Authorization', `Bearer ${authToken.access}`),
          observe: 'body'
        }
      );
    }
    return this.http.patch<Token|any>(
      `${env.API_DOMAIN}api/token/`,
      {'refresh_token': ''},
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    );
  }
  public getTokenViaRefreshHttpPost(refreshToken: string): Observable<any|Token>{
    return this.http.post<any|Token>(
      `${env.API_DOMAIN}api/token/refresh/`,
      { "refresh": refreshToken },{
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }
  public verifyTokenHttpPost(accessToken: string): Observable<any>{
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
  public createHearoAccountHttpPost(hearoUser: RegisterUser): Observable<any>{
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
  /* QR access account access/refresh token on cookie web browser set/get */
  /* cookie qr access account */
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
  public deleteToken_AccessQRAccount(): void{
    this.cookie.delete('qr_access_token', '/');
    this.cookie.delete('qr_access_token_refresh', '/');
  }
  public async refreshAccessQRTokenOnCookieAsync(): Promise<boolean>{
    const oldToken: Token|null= this.getToken_AccessQRAccount();
    if( oldToken==null ){ throw new Error("Incorrect implementation refreshAccessQRTokenOnCookie() must be used after qr scanned"); }

    try{
      const newToken: Token= await firstValueFrom(this.getTokenViaRefreshHttpPost(oldToken.refresh));
      this.deleteToken_AccessQRAccount();
      this.saveToken_AccessQRAccount(newToken);
    }catch(error){ return false; }

    return true;
  }








  /* ------------------------------------------------ */
  /* access/refresh token on cookie web browser set/get */
  /* cookie hearo team account */
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
  public deleteAccountToken(): void{
    this.cookie.delete('account_token', '/');
    this.cookie.delete('account_token_refresh', '/');
  }
  public getUserIdViaTokenAuth(): string|null{
    const token: Token|null= this.getAccountToken()
    if( token==null ){ return null; }
    try{
      /*
       * eg.
       * token= 'sdfisdfs.dfsdifw.efsdjsdfi4'
       * token.split('.') --> ['sdfisdfs', 'dfsdifw', 'efsdjsdfi4']
       * atob, ascii to binary, ie. decode base64
       */
      const payload= JSON.parse(atob(token.access.split('.')[1]));
      return payload.user_id;
    }catch(e) {
      return null;
    }
  }
  public async refreshAuthTokenOnCookieAsync(): Promise<boolean>{
    const oldToken: Token|null= this.getAccountToken();
    if( oldToken==null ){ throw new Error("Incorrect implementation, refreshAuthTokenOnCookieAsync() must be used after logged in"); }

    try{
      const newToken: Token= await firstValueFrom(this.getTokenViaRefreshHttpPost(oldToken.refresh));
      this.deleteAccountToken();
      this.saveAccountToken(newToken);
    }catch(error){ return false; }

    return true;
  }








  /* essential tools which involves authentication from user */
  public async isTokenValidAsync(token: string): Promise<boolean>{
    try{
      await firstValueFrom(this.verifyTokenHttpPost(token));
      /* returns status 200 if valid */
    }catch(err){
      /* else 401 */
      return false;
    }
    return true;
  }
  public async goTo_home_pageIfValidAuthTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getAccountToken();
    if( authToken!=null ){
      try{
        await firstValueFrom(this.verifyTokenHttpPost(authToken.access));
        this.deleteToken_AccessQRAccount();
        await this.router.navigate(['/home/sentence']);
        return true;
      }catch(err){
        try {
          const validToken: Token= await firstValueFrom(this.getTokenViaRefreshHttpPost(authToken.refresh));
          this.saveAccountToken(validToken);
          this.deleteToken_AccessQRAccount();
          await this.router.navigate(['/home/sentence']);
          return true;
        } catch (refreshErr) {
        }
      }
    }
    return false;
  }
  public async goTo_login_pageIfNotValidAuthTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getAccountToken();
    if( authToken!=null &&
        authToken.access!='' && authToken.access!=null &&
        authToken.refresh!='' && authToken.refresh!=null ){
      if(await this.isTokenValidAsync(authToken.access)){
        return false;
      }else if(await this.isTokenValidAsync(authToken.refresh)){
        try{
          authToken= await firstValueFrom(this.getTokenViaRefreshHttpPost(authToken.refresh));
          if( authToken!=null ){
            this.saveAccountToken(authToken)
            return false; /* due2not going to /login */
          }
        }catch(err){ /* just continue below for DRY */ }
      }
    }
    await this.router.navigate(['/login']);
    return true;
  }
  public async goTo_register_pageIfValidQRTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getToken_AccessQRAccount();
    if( authToken!=null &&
        authToken.access!='' && authToken.access!=null &&
        authToken.refresh!='' && authToken.refresh!=null ){
      if(await this.isTokenValidAsync(authToken.access)){
        this.deleteAccountToken();
        await this.router.navigate(['/register']);
        return true;
      }else if(await this.isTokenValidAsync(authToken.refresh)){
        try{
          authToken= await firstValueFrom(this.getTokenViaRefreshHttpPost(authToken.refresh));
          if( authToken!=null ){
            this.saveToken_AccessQRAccount(authToken)
            this.deleteAccountToken();
            await this.router.navigate(['/register']);
            return true;
          }
        }catch(err){ /* due2refresh expired */ }
      }
    }
    return false;
  }
  public async goTo_verify_to_register_pageIfNotValidQRTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getToken_AccessQRAccount();
    if( authToken!=null &&
        authToken.access!='' && authToken.access!=null &&
        authToken.refresh!='' && authToken.refresh!=null ){
      if(await this.isTokenValidAsync(authToken.access)){
        return false;
      }else if(await this.isTokenValidAsync(authToken.refresh)){
        try{
          authToken= await firstValueFrom(this.getTokenViaRefreshHttpPost(authToken.refresh));
          if( authToken!=null ){
            this.saveToken_AccessQRAccount(authToken)
            return false; /* due2not going to /verify-to-register */
          }
        }catch(err){ /* just continue below for DRY */ }
      }
    }
    await this.router.navigate(['/verify-to-register']);
    return true;
  }
  public async userLogOutAsync(): Promise<boolean>{
    try{
      await firstValueFrom(this.__userLogoutHttpPatch());
      this.deleteAccountToken();
      await this.router.navigate(['/login']);
    }catch(err){}
    return true;
  }
  public async qrAccessAccountRemoveAnd_goTo_login_pageAsync(): Promise<boolean>{
    try{
      await firstValueFrom(this.__qrAccessLogoutHttpPatch());
      this.deleteToken_AccessQRAccount();
      await this.router.navigate(['/login']);
    }catch(err){}
    return true;
  }
}
