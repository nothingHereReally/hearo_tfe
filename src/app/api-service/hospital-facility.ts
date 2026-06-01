import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { AddHospitalFacility, HospitalFacility as HospitalFacilityModel, ResponseHospitalFacility, RowHospitalFacility, RowResponseHospitalFacility } from '../model/hospital-facility';
import { environment as env } from '../../environment/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';


@Injectable({
  providedIn: 'root',
})
export class HospitalFacility {
  private __http: HttpClient= inject(HttpClient);


  private __readHospitalFacilities: RowResponseHospitalFacility|null= null;
  private readonly __initHospitalFacilityUrl: string= `${env.API_DOMAIN}api/v1/hospital-facilities/`;
  private __hospitalFaclityUrl: string= `${this.__initHospitalFacilityUrl}`;


  private __getHospitalFacilityHttpGet(): Observable<RowResponseHospitalFacility|null>{
    return this.__http.get<RowResponseHospitalFacility>(
      this.__hospitalFaclityUrl,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }


  private __getTransformedDataFromReadHospitalFaclities(): ResponseHospitalFacility|null{
    let outResponse: ResponseHospitalFacility|null= null;
    if( this.__readHospitalFacilities ){
      outResponse= {
        count: this.__readHospitalFacilities.count,
        previous: this.__readHospitalFacilities.previous!=null,
        next: this.__readHospitalFacilities.next!=null,
        results: []
      };
      if( 0<this.__readHospitalFacilities.count ){
        outResponse.results= this.__readHospitalFacilities.results.map(el=>({
          ...el,
          date_added: new Date(el.date_added),
          last_update: new Date(el.last_update),
        }));
      }
    }


    return outResponse;
  }


  /* TODO: do this below function */
  private async __updateListOfHospitalFaclities(): Promise<void>{
    this.__hospitalFaclityUrl= this.__initHospitalFacilityUrl;
    this.__readHospitalFacilities= await firstValueFrom(this.__getHospitalFacilityHttpGet());
  }
  public async goPrevHospitalFacilities(): Promise<void>{
    if( this.__readHospitalFacilities?.previous ){
      this.__hospitalFaclityUrl= this.__readHospitalFacilities.previous;
      this.__readHospitalFacilities= await firstValueFrom(this.__getHospitalFacilityHttpGet());
    }
  }
  public async goNextHospitalFacilities(): Promise<void>{
    if( this.__readHospitalFacilities?.next ){
      this.__hospitalFaclityUrl= this.__readHospitalFacilities.next;
      this.__readHospitalFacilities= await firstValueFrom(this.__getHospitalFacilityHttpGet());
    }
  }
  public async getHospitalFacilities(forceUpdateInit: boolean=false): Promise<ResponseHospitalFacility|null>{
    if( ! this.__readHospitalFacilities || forceUpdateInit ){
      await this.__updateListOfHospitalFaclities();
    }


    return this.__getTransformedDataFromReadHospitalFaclities();
  }
  public async searchHospitalFacilities(hospitalNameOrAddress: string): Promise<
    ResponseHospitalFacility|null
  >{
    if(hospitalNameOrAddress==''){
      return await this.getHospitalFacilities();  }


    this.__hospitalFaclityUrl= `${this.__initHospitalFacilityUrl}?search=${hospitalNameOrAddress}`;
    this.__readHospitalFacilities= await firstValueFrom(this.__getHospitalFacilityHttpGet());


    return this.__getTransformedDataFromReadHospitalFaclities();
  }
  public getHospitalFacilityById(hospitalFacilityId: number): Observable<RowHospitalFacility|null>{
    return this.__http.get<RowHospitalFacility|null>(
      `${this.__initHospitalFacilityUrl}${hospitalFacilityId}/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }


  public addHospitalFacility(newHospitalFacility: AddHospitalFacility): Observable<RowHospitalFacility>{
    return this.__http.post<RowHospitalFacility>(
      `${this.__initHospitalFacilityUrl}`,
      newHospitalFacility,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        credentials: 'include',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
  public updateHospitalFacility(id: number, newHospitalFacility: AddHospitalFacility): Observable<RowHospitalFacility>{
    return this.__http.patch<RowHospitalFacility>(
      `${this.__initHospitalFacilityUrl}${id}/`,
      newHospitalFacility,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
  public deleteHospitalFacility(id: number): Observable<null>{
    return this.__http.delete<null>(
      `${this.__initHospitalFacilityUrl}${id}/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        context: AddAuthTokenHttpIntercept
      }
    );
  }


  public getHospitalFacilityFromRow(hospitalFacility: RowHospitalFacility): HospitalFacilityModel{
    return {
      ...hospitalFacility,
      date_added: new Date(hospitalFacility.date_added),
      last_update: new Date(hospitalFacility.last_update)
    }
  }
}
