import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../model/constant';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../model/token';
import { RegisterUser } from '../model/register-user';

@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  private http= inject(HttpClient);
  private cookie= inject(CookieService);


  public verifyQR_hearoAccessAccount(qr_image_blob: any): Observable<any|Token>{
    let header: HttpHeaders= new HttpHeaders({
       "Accept": "application/json"
    });
    const formData= new FormData();
    formData.append('image', qr_image_blob, 'image.png');

    return this.http.post<any|Token>(
      API_DOMAIN+"api/token/qr/hearo-team/",
      formData,{
        headers: header,
        observe: 'body'
      }
    )
  }
  public getTokenViaRefresh(refreshToken: string): Observable<any|Token>{
    let header: HttpHeaders= new HttpHeaders({
       "Content-Type": "application/json",
       "Accept": "application/json"
    });
    return this.http.post<any|Token>(
      API_DOMAIN+"api/token/refresh/",
      { "refresh": refreshToken },{
        headers: header,
        observe: 'body'
      }
    )
  }


  public createHearoAccount(hearoUser: RegisterUser): Observable<any>{
    let token: Token= this.getToken_AccessQRAccount()==null? {
      access: '',
      refresh: ''
    }: this.getToken_AccessQRAccount()!;
    if( token.access=='' ){
      throw new TypeError("Access token for QR access account can't be empty");
    }
    let header: HttpHeaders= new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token.access}`
    })
    let newHearoUser= {
      "account_type": "ht",
      "email": hearoUser.email,
      "username": hearoUser.username,
      "password": hearoUser.password,
      "first_name": hearoUser.first_name,
      "last_name": hearoUser.last_name
    };
    return this.http.post<any>(
      API_DOMAIN+"api/v1/users/",
      newHearoUser,{
        headers: header,
        observe: 'body',
        credentials: 'include'
      },
    );
  }




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
    const token: Token = {
      access: String(this.cookie.get('qr_access_token')),
      refresh: String(this.cookie.get('qr_access_token_refresh'))
    }
    if( token.access=="" || token.access==null || token.access.length==0 ||
      token.refresh=="" || token.refresh==null || token.refresh.length==0 ){
      return null;
    }
    return token;
  }


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
    const token: Token = {
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
