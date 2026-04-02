import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { environment as env } from '../../environment/environment';
import { httpRequestHeadersReceiveJson } from '../model/tools';
import { HearoTeamDataStruct } from '../model/account';
import { AuthUser } from './auth-user';


@Injectable({
  providedIn: 'root'
})
export class ApiFile {
  private http= inject(HttpClient);
  private sanitizer: DomSanitizer= inject(DomSanitizer);


  private authUser= inject(AuthUser);
  public cachedProfilePicture: WritableSignal<SafeUrl>= signal('/user_default_profile.svg');
  private __isCachedProfilePhotoAtLeastOnce: WritableSignal<boolean>= signal(false);


  public imgBlob2SafeUrl(imgBlob: File|Blob): SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imgBlob));
  }
  private async __getProfilePictureViaSafeUrlAsync(): Promise<SafeUrl>{
    const imgBlob= await firstValueFrom(this.http.get(
      `${env.API_DOMAIN}api/v1/get-profile-picture/`,
      {
        observe: 'body',
        responseType: 'blob',
        context: AddAuthTokenHttpIntercept
      },
    ));
    return this.imgBlob2SafeUrl(imgBlob);
  }
  /**
   * getProfilePictureViaSafeUrlAsync() to be used only when logged in
   */
  public async updateProfilePhotoAsync(force: boolean=false): Promise<void>{
    if( this.__isCachedProfilePhotoAtLeastOnce()==false || force ){
      this.cachedProfilePicture.set( await this.__getProfilePictureViaSafeUrlAsync() );
      this.__isCachedProfilePhotoAtLeastOnce.set(true);
    }
  }




  public uploadPhotoUserHttpPatch(image_blob: File): Observable<HearoTeamDataStruct>{
    this.cachedProfilePicture.set( this.imgBlob2SafeUrl(image_blob) );

    const formData= new FormData();
    formData.append('profile_picture', image_blob, image_blob.name);

    return this.http.patch<HearoTeamDataStruct>(
      `${env.API_DOMAIN}api/v1/hearo-teams/${this.authUser.getUserIdViaTokenAuth()}/`,
      formData,{
        headers: httpRequestHeadersReceiveJson,
        observe: 'body',
        context: AddAuthTokenHttpIntercept
      }
    )
  }
}
