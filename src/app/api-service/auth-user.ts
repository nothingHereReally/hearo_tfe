import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie-service';
import { environment as env } from '../../environment/environment';
import { httpRequestHeadersReceiveJson, httpRequestHeadersSendReceiveJson } from '../model/tools';
import { LoginField } from '../model/login-field';
import { Token } from '../model/token';
import { DiffUserInfo, ForgotPasswordField, ForgotPasswordResponse, HearoTeamDataStruct, RegisterUser, ResetPasswordField } from '../model/account';
import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { AddAuthQRTokenHttpIntercept } from '../services/auth-qr-access-http-interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  private http= inject(HttpClient);
  private cookie= inject(CookieService);
  private router= inject(Router);


  public cachedHearoUser: WritableSignal<HearoTeamDataStruct>= signal({
    email_verified: true,
    is_access_account: false,
    last_update: '',
    profile_picture: '',
    user: {
      id: 0,
      email:      'user email be what',
      username:   'user username be what',
      first_name: 'user first name be what',
      last_name:  'user last name be what',
      password_last_modified: '',
      date_joined: '',
      last_login: ''
    }
  });
  private __isCachedHearoUserAtLeastOnce: WritableSignal<boolean>= signal(false);








  /* ------------------------------------------------ */
  /* access/refresh token management to API on back-end */
  /**
   * does HTTP POST request to backend
   * -- send image
   * -- if valid returns the access/refresh token
   * -- can be used for auth on creating account
   * @param qr_image_blob image blob data
   */
  public verifyQRHearoAccessAccountHttpPost(qr_image_blob: any): Observable<any|Token>{
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
        password: resetpw.password
      },{
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }
  private __qrAccessLogoutHttpPatch(): Observable<any>{
    /* needs refresh_token */
    return this.http.patch<any>(
    `${env.API_DOMAIN}api/token/`,
      {refresh_token: this.getTokenAccessQRAccount()?.refresh},
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthQRTokenHttpIntercept
      }
    );
  }
  private __userLogoutHttpPatch(): Observable<any>{
    /* needs refresh_token */
    return this.http.patch<Token|any>(
    `${env.API_DOMAIN}api/token/`,
      {refresh_token: this.getAccountToken()?.refresh},
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
  public getTokenViaRefreshHttpPost(refreshToken: string): Observable<any|Token>{
    return this.http.post<any|Token>(
      `${env.API_DOMAIN}api/token/refresh/`,
      { refresh: refreshToken },{
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }
  public verifyTokenHttpPost(accessToken: string): Observable<any>{
    return this.http.post<any>(
      `${env.API_DOMAIN}api/token/verify/`,
      {token: accessToken},
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body'
      }
    )
  }








  /* ------------------------------------------------ */
  /* account hearo-team CRUD */
  public createHearoAccountHttpPost(hearoUser: RegisterUser): Observable<any>{
    return this.http.post<any>(
      `${env.API_DOMAIN}api/v1/hearo-teams/`,
      {
          user: {
              email: hearoUser.email,
              username: hearoUser.username,
              password: hearoUser.password,
              first_name: hearoUser.first_name,
              last_name: hearoUser.last_name
          },
          /* "is_access_account": false, onCreateForceFalse onBackEnd API */
      },{
          headers: httpRequestHeadersSendReceiveJson,
          observe: 'body',
          credentials: 'include',
          context: AddAuthQRTokenHttpIntercept
      },
    );
  }
  public updateHearoAccountHttpPatch(hearoUser: HearoTeamDataStruct): Observable<HearoTeamDataStruct|any>{
    return this.http.patch<HearoTeamDataStruct|any>(
      `${env.API_DOMAIN}api/v1/hearo-teams/${this.getUserIdViaTokenAuth()}/`,
      hearoUser,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
  public async getHearoTeamAccountAsync(): Promise<HearoTeamDataStruct>{
    return await firstValueFrom(this.http.get<HearoTeamDataStruct>(
      `${env.API_DOMAIN}api/v1/hearo-teams/${this.getUserIdViaTokenAuth()}/`,
      {
      headers: httpRequestHeadersSendReceiveJson,
      observe: 'body',
      credentials: 'include',
      context: AddAuthTokenHttpIntercept
      }
    ));
  }
  /**
   * updateHearoTeamAccount4BasicInfoAsync(
   *     user: HearoTeamDataStruct,
   *     isDiff: DiffUserInfo
   * ): Promise<HearoTeamDataStruct|null>
   *
   * @param user - user information value for update
   *
   * @param isDiff - user information holds which needs to be updated
   *
   * to be used when updating only
   * -----------------------------
   * first_name OR
   * last_name OR
   * email OR
   * username
   */
  public async updateHearoTeamAccount4BasicInfoAsync(user: HearoTeamDataStruct, isDiff: DiffUserInfo): Promise<HearoTeamDataStruct>{
    let token:Token|null= this.getAccountToken();
    if( token==null ){
      throw new Error("Incorrect implementation due to updateHearoTeamAccount4BasicInfoAsync() should be used when already logged in");

    }
    let userInfo2Update: Record<string, string>= {};
    let hasUpdate: boolean= false;
    if( isDiff.first_name ){
      userInfo2Update['first_name']= String(user.user?.first_name);
      hasUpdate= true;
    }
    if( isDiff.last_name ){
      userInfo2Update['last_name']= String(user.user?.last_name);
      hasUpdate= true;
    }
    if( isDiff.email ){
      userInfo2Update['email']= String(user.user?.email);
      hasUpdate= true;
    }
    if( isDiff.username ){
      userInfo2Update['username']= String(user.user?.username);
      hasUpdate= true;
    }

    if( hasUpdate ){
      const userInfoUpdated: HearoTeamDataStruct= await firstValueFrom(this.updateHearoAccountHttpPatch({user: userInfo2Update}));

      return userInfoUpdated;
    }


    throw new Error("Incorrect implementation of using updateHearoTeamAccount4BasicInfoAsync(), no true on `isDiff: DiffUserInfo` parameter");
  }
  public deleteHearoTeamHttpDelete(): Observable<any>{
    return this.http.delete(
      `${env.API_DOMAIN}api/v1/hearo-teams/${this.getUserIdViaTokenAuth()}/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }








  /* local storage CRUD */
  public setJsonLocalStorage(key: string, data: any): void{
    localStorage.setItem(key, JSON.stringify(data));
  }
  public getJsonLocalStorage<T>(key: string): T|null{
    const data = localStorage.getItem(key);
    if(!data) return null;

    try{
      return JSON.parse(data) as T;
    }catch(e){ return null; }
  }
  public removeJsonLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }








  /* hearo user on AuthUser.cachedHearoUser() */
  /**
   * updateHearoUserOnCacheAsync() must be only
   * used after --> logged in <--
   */
  public async updateHearoUserOnCacheAsync(force: boolean=false): Promise<void>{
    if( this.__isCachedHearoUserAtLeastOnce()==false || force ){
      this.cachedHearoUser.set( await this.getHearoTeamAccountAsync() );
      this.__isCachedHearoUserAtLeastOnce.set(true);
    }
  }
  public cachedHearoUserGoBack2Default(): void{
    this.cachedHearoUser.set({
      email_verified: true,
      is_access_account: false,
      last_update: '',
      profile_picture: '',
      user: {
        id: 0,
        email:      'user email be what',
        username:   'user username be what',
        first_name: 'user first name be what',
        last_name:  'user last name be what',
        password_last_modified: '',
        date_joined: '',
        last_login: ''
      }
    });
    this.__isCachedHearoUserAtLeastOnce.set(false);
  }








  /* ------------------------------------------------ */
  /* QR access account access/refresh token on cookie web browser set/get */
  /* cookie qr access account */
  public saveTokenAccessQRAccount(token: Token): void{
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
  public getTokenAccessQRAccount(): Token|null{
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
  public deleteTokenAccessQRAccount(): void{
    this.cookie.delete('qr_access_token', '/');
    this.cookie.delete('qr_access_token_refresh', '/');
  }
  public async refreshAccessQRTokenOnCookieAsync(): Promise<boolean>{
    const oldToken: Token|null= this.getTokenAccessQRAccount();
    if( oldToken==null ){ throw new Error("Incorrect implementation, refreshAccessQRTokenOnCookieAsync() must be used after qr scanned"); }

    try{
      const newToken: Token= await firstValueFrom(this.getTokenViaRefreshHttpPost(oldToken.refresh));
      this.deleteTokenAccessQRAccount();
      this.saveTokenAccessQRAccount(newToken);
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
  public async refreshAuthUserTokenOnCookieAsync(): Promise<boolean>{
    const oldToken: Token|null= this.getAccountToken();
    if( oldToken==null ){ throw new Error("Incorrect implementation, refreshAuthUserTokenOnCookieAsync() must be used after logged in"); }

    try{
      const newToken: Token= await firstValueFrom(this.getTokenViaRefreshHttpPost(oldToken.refresh));
      this.deleteAccountToken();
      this.saveAccountToken(newToken);
    }catch(error){ return false; }

    return true;
  }








  /* go to pages, returns true if success else false
   * due to will not force to go to that page if
   * already has correct jwt token for authentication
   */
  public async goTo_home_pageIfValidAuthTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getAccountToken();
    if( authToken!=null &&
        await this.isTokenValidAsync(authToken.access) ||
      ( authToken!=null &&
        await this.isTokenValidAsync(authToken.refresh) &&
        await this.refreshAuthUserTokenOnCookieAsync() )  ){

      this.deleteTokenAccessQRAccount();
      await this.router.navigate(['/home/sentence']);
      return true;
    }

    return false;
  }
  public async goTo_login_pageIfNotValidAuthTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getAccountToken();
    if(
      ( authToken!=null &&
        await this.isTokenValidAsync(authToken.access) )
        ||
      ( authToken!=null &&
        await this.isTokenValidAsync(authToken.refresh) &&
        await this.refreshAuthUserTokenOnCookieAsync() )  ){

      return false; /* due to valid auth user, ie. logged in, then don't go /login */
    }

    await this.router.navigate(['/login']);
    return true;
  }
  public async goTo_register_pageIfValidQRTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getTokenAccessQRAccount();
    if( authToken!=null &&
        await this.isTokenValidAsync(authToken.access) ||
      ( authToken!=null &&
        await this.isTokenValidAsync(authToken.refresh) &&
        await this.refreshAccessQRTokenOnCookieAsync() )  ){

      this.deleteAccountToken();
      await this.router.navigate(['/register']);
      return true;
    }

    return false;
  }
  public async goTo_verify_to_register_pageIfNotValidQRTokenAsync(): Promise<boolean>{
    let authToken: Token|null= this.getTokenAccessQRAccount();
    if( authToken!=null &&
        await this.isTokenValidAsync(authToken.access) ||
      ( authToken!=null &&
        await this.isTokenValidAsync(authToken.refresh) &&
        await this.refreshAccessQRTokenOnCookieAsync() )  ){

      this.deleteAccountToken();
      return false;
    }

    await this.router.navigate(['/verify-to-register']);
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
  public async userLogOutAsync(): Promise<boolean>{
    try{
      await firstValueFrom(this.__userLogoutHttpPatch());
      this.deleteAccountToken();
      await this.router.navigate(['/login']);
    }catch(err){}
    return true;
  }
  /**
   * goal is force be going to /login page via deleting QR access token
   * and navigate to /login
   */
  public async qrAccessAccountRemoveAnd_goTo_login_pageAsync(): Promise<boolean>{
    try{
      await firstValueFrom(this.__qrAccessLogoutHttpPatch());
      this.deleteTokenAccessQRAccount();
      await this.router.navigate(['/login']);
    }catch(err){}
    return true;
  }
}
