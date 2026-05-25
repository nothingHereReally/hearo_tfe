import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { Observable } from 'rxjs';
import { RowPageDocumentFile } from '../model/document-file';


@Injectable({
  providedIn: 'root',
})
export class HospitalHeadDocument {
  private __http: HttpClient= inject(HttpClient);


  /* private __readDocuments: RowPageDocumentFile|null= null; */
  private readonly __initDocumentUrl: string= `${env.API_DOMAIN}api/v1/documents/`;
  /* private __documentUrl: string= `${this.__initDocumentUrl}`; */


  public getPageDocumentsByHospitalHeadId(hospitalHeadId: number): Observable<RowPageDocumentFile>{
    return this.__http.get<RowPageDocumentFile>(
      `${this.__initDocumentUrl}?hospital-head=${hospitalHeadId}`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
}
