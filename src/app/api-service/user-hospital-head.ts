import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserHospitalHead{
  private http: HttpClient= inject(HttpClient);


  public getHospitalHead(): Observable<any>{
    return this.http.get<any>(
      `${env.API_DOMAIN}/api/v1/hospital-heads/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
      observe: 'body',
      credentials: 'include',
      context: AddAuthTokenHttpIntercept
      }
    );
  }
}
