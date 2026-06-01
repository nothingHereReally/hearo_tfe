import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartDoughnutHomeSentence } from '../model/chart-doughnut-home-sentence';
import { HttpClient } from '@angular/common/http';


import { environment as env } from '../../environment/environment';
import { httpRequestHeadersSendReceiveJson } from '../model/tools';
import { AddAuthTokenHttpIntercept } from '../services/auth-token-http-intercept-interceptor';


@Injectable({
  providedIn: 'root',
})
export class StatisticalData {
  private http: HttpClient= inject(HttpClient);


  public getMostMistaken9Sentences(): Observable<ChartDoughnutHomeSentence>{
    return this.http.get<ChartDoughnutHomeSentence>(
      `${env.API_DOMAIN}api/v1/get-most-mistaken9sentences/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
  public getMostFrequent9Sentences(): Observable<ChartDoughnutHomeSentence>{
    return this.http.get<ChartDoughnutHomeSentence>(
      `${env.API_DOMAIN}api/v1/get-most-frequent9sentences/`,
      {
        headers: httpRequestHeadersSendReceiveJson,
        observe: 'body',
        context: AddAuthTokenHttpIntercept
      }
    );
  }
}
