import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_DOMAIN } from '../model/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  private http= inject(HttpClient);


  public verifyQR_hearoAccessAccount(qr_image_blob: any): Observable<any>{
    let header: HttpHeaders= new HttpHeaders({
       "Accept": "application/json"
    });
    const formData= new FormData();
    formData.append('image', qr_image_blob, 'image.png');

    return this.http.post<any>(
      API_DOMAIN+"api/token/qr/hearo-team",
      formData,
      {
        headers: header,
        observe: 'response'
      }
    )
  }
}
