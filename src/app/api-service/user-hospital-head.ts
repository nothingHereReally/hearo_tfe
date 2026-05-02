import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { firstValueFrom, Observable } from 'rxjs';
import { ResponseHospitalHead, RowResponseHospitalHead } from '../model/hospital-head';


@Injectable({
  providedIn: 'root',
})
export class UserHospitalHead{
  private http: HttpClient= inject(HttpClient);


  private readHospitalHeads: RowResponseHospitalHead|null= null;
  private readonly initHospitalHeadUrl: string= `${env.API_DOMAIN}api/v1/hospital-heads/`;
  private hospitalHeadUrl: string= `${this.initHospitalHeadUrl}`;


  private getHospitalHeadHttpGet(): Observable<RowResponseHospitalHead>{
    return this.http.get<RowResponseHospitalHead>(
      this.hospitalHeadUrl,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }


  private async updateListOfHospitalHeads(): Promise<void>{
    this.hospitalHeadUrl= this.initHospitalHeadUrl;
    this.readHospitalHeads= await firstValueFrom(this.getHospitalHeadHttpGet());
  }
  public async goPrevHospitalHeads(): Promise<void>{
    if( this.readHospitalHeads?.previous ){
      this.hospitalHeadUrl= this.readHospitalHeads.previous;
      this.readHospitalHeads= await firstValueFrom(this.getHospitalHeadHttpGet());
    }
  }
  public async goNextHospitalHeads(): Promise<void>{
    if( this.readHospitalHeads?.next ){
      this.hospitalHeadUrl= this.readHospitalHeads.next;
      this.readHospitalHeads= await firstValueFrom(this.getHospitalHeadHttpGet());
    }
  }
  public async getHospitalHeads(forceUpdateInit: boolean=false): Promise<ResponseHospitalHead>{
    if( ! this.readHospitalHeads || forceUpdateInit ){
      await this.updateListOfHospitalHeads();
    }
    let outResponse: ResponseHospitalHead= {
      count: this.readHospitalHeads!.count,
      previous: this.readHospitalHeads?.previous!=null,
      next: this.readHospitalHeads?.next!=null,
      results: []
    };
    if( 0<this.readHospitalHeads!.count ){
      outResponse.results= this.readHospitalHeads!.results.map(el=>({
        ...el,
        last_update: new Date(el.last_update),
        user: {
          ...el.user,
          password_last_modified: new Date(el.user.password_last_modified),
          date_joined: new Date(el.user.date_joined),
          last_login: new Date(el.user.last_login)
        }
      }));
    }


    return outResponse;
  }
}
