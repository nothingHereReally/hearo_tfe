import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { AuthUser } from './auth-user';
import { Token } from '../model/token';


@Injectable({
  providedIn: 'root'
})
export class ApiFile {
  private http= inject(HttpClient);
  private sanitizer: DomSanitizer= inject(DomSanitizer);
  private authUser: AuthUser= inject(AuthUser);

  public async getProfilePictureViaSafeUrl(): Promise<SafeUrl>{
    const authToken: Token|null= this.authUser.getAccountToken();
    let errorOut: any= Error("User must be logged in, incorrect implementation.");
    if( authToken!=null ){
      try{
        const imgBlob= await firstValueFrom(this.http.get(
          `${env.API_DOMAIN}api/v1/get-profile-picture/`,
          {
            headers: httpRequestHeadersSendReceiveJson.set('Authorization', `Bearer ${authToken.access}`),
            observe: 'body',
            responseType: 'blob'
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
}
