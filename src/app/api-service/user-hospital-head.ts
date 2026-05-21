import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';
import { firstValueFrom, Observable } from 'rxjs';
import { HospitalHead, ResponseHospitalHead, RowResponseHospitalHead } from '../model/hospital-head';


@Injectable({
  providedIn: 'root',
})
export class UserHospitalHead{
  private __http: HttpClient= inject(HttpClient);


  private __readHospitalHeads: RowResponseHospitalHead|null= null;
  private readonly __initHospitalHeadUrl: string= `${env.API_DOMAIN}api/v1/hospital-heads/`;
  private __hospitalHeadUrl: string= `${this.__initHospitalHeadUrl}`;


  private __getHospitalHeadHttpGet(): Observable<RowResponseHospitalHead|null>{
    return this.__http.get<RowResponseHospitalHead>(
      this.__hospitalHeadUrl,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }


  private __getTransformedDataFromReadHospitalHeads(): ResponseHospitalHead|null{
    let outResponse: ResponseHospitalHead|null= null;
    if( this.__readHospitalHeads ){
      outResponse= {
        count: this.__readHospitalHeads!.count,
        previous: this.__readHospitalHeads?.previous!=null,
        next: this.__readHospitalHeads?.next!=null,
        results: []
      };
      if( 0<this.__readHospitalHeads!.count ){
        outResponse.results= this.__readHospitalHeads!.results.map(el=>({
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
    }


    return outResponse;
  }


  private async __updateListOfHospitalHeads(): Promise<void>{
    this.__hospitalHeadUrl= this.__initHospitalHeadUrl;
    this.__readHospitalHeads= await firstValueFrom(this.__getHospitalHeadHttpGet());
  }
  public async goPrevHospitalHeads(): Promise<void>{
    if( this.__readHospitalHeads?.previous ){
      this.__hospitalHeadUrl= this.__readHospitalHeads.previous;
      this.__readHospitalHeads= await firstValueFrom(this.__getHospitalHeadHttpGet());
    }
  }
  public async goNextHospitalHeads(): Promise<void>{
    if( this.__readHospitalHeads?.next ){
      this.__hospitalHeadUrl= this.__readHospitalHeads.next;
      this.__readHospitalHeads= await firstValueFrom(this.__getHospitalHeadHttpGet());
    }
  }
  public async getHospitalHeads(forceUpdateInit: boolean=false): Promise<ResponseHospitalHead|null>{
    if( ! this.__readHospitalHeads || forceUpdateInit ){
      await this.__updateListOfHospitalHeads();
    }


    return this.__getTransformedDataFromReadHospitalHeads();
  }
  public async searchHospitalHeads(hospitalHeadNameOrHospitalFacilityName: string): Promise<
    ResponseHospitalHead|null
  >{
    if(hospitalHeadNameOrHospitalFacilityName==''){
      return await this.getHospitalHeads();  }


    this.__hospitalHeadUrl= `${this.__initHospitalHeadUrl}?search=${hospitalHeadNameOrHospitalFacilityName}`;
    this.__readHospitalHeads= await firstValueFrom(this.__getHospitalHeadHttpGet());


    return this.__getTransformedDataFromReadHospitalHeads();
  }
  public getHospitalHeadById(userId: number): Observable<HospitalHead|null>{
    return this.__http.get<HospitalHead>(
      `${this.__initHospitalHeadUrl}${userId}/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
        /* DONE: if 404 then return 404 on AddAuthTokenHttpIntercept */
      }
    );
  }
}
