import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { AuthUser } from './auth-user';
import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { Token } from '../model/token';


@Injectable({
  providedIn: 'root'
})
export class ApiFile {
  private http= inject(HttpClient);
  private sanitizer: DomSanitizer= inject(DomSanitizer);
  private authUser: AuthUser= inject(AuthUser);

  private cachedProfilePicture: SafeUrl|null= null;

  private async __getProfilePictureViaSafeUrlAsync(): Promise<SafeUrl>{
    const authToken: Token|null= this.authUser.getAccountToken();
    let errorOut: any= Error("User must be logged in, incorrect implementation.");
    if( authToken!=null ){
      try{
        const imgBlob= await firstValueFrom(this.http.get(
          `${env.API_DOMAIN}api/v1/get-profile-picture/`,
          {
            headers: httpRequestHeadersSendReceiveJson,
            observe: 'body',
            responseType: 'blob',
            context: AddAuthTokenHttpIntercept
          },
        ));
        const objectUrl = URL.createObjectURL(imgBlob);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }catch (error) {
        errorOut= error;
      }
    }
    throw errorOut;
  }
  /**
  * getProfilePictureViaSafeUrlAsync() to be used only when logged in
  */
  public async getProfilePictureViaSafeUrlAsync(force: boolean=false): Promise<SafeUrl>{
    try{
      if( this.cachedProfilePicture==null || force ){
        this.cachedProfilePicture= await this.__getProfilePictureViaSafeUrlAsync();
      }
      return this.cachedProfilePicture;
    }catch(error: any){}

    return '/user_default_profile.svg';
  }
}
