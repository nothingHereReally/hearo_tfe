import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


import { Header } from '../../essential/header/header';
// import { DataTable } from '../../essential/data-table/data-table';


import { AuthUser } from '../../api-service/auth-user';
import { DoughnutGraph } from '../../chart/doughnut-graph/doughnut-graph';
import { StatisticalData } from '../../api-service/statistical-data';
import { firstValueFrom } from 'rxjs';
import { ChartDoughnutHomeSentence } from '../../model/chart-doughnut-home-sentence';
import { sumArray } from '../../model/tools';
import { Button } from '../../essential/button/button';
// import { TableHospitalHead } from '../../model/table-hospital-head';


@Component({
  selector: 'app-home-sentence',
  imports: [
    // DataTable,
    DoughnutGraph,
    Button,
    Header,
  ],
  templateUrl: './home-sentence.html',
  styleUrl: './home-sentence.css'
})
export class HomeSentence implements OnInit{
  private authUser: AuthUser= inject(AuthUser);
  private statData: StatisticalData= inject(StatisticalData);
  protected mostFrequent9sentence: WritableSignal<ChartDoughnutHomeSentence>= signal({
    accuracy: 0.0,
    response_time_ms: 0.0,
    sentences: [],
    total_rows: 0
  })
  protected mostMistaken9sentence: WritableSignal<ChartDoughnutHomeSentence>= signal({
    accuracy: 0.0,
    response_time_ms: 0.0,
    sentences: [],
    total_rows: 0
  })
  protected doughnut4frequentSentence: WritableSignal<Array<number>>= signal([]);
  protected doughnut4mistakenSentence: WritableSignal<Array<number>>= signal([]);
  protected mostFrequentQuantityPercent: WritableSignal<Array<number>>= signal([]);
  protected mostMistakenQuantityPercent: WritableSignal<Array<number>>= signal([]);


  // protected contents: Array< TableHospitalHead >= [
  //   {
  //     name: 'Liza Mae Villanueva',
  //     hospital: 'Cebu City Medical Center',
  //     datetime: 'July 4, 2025 8:50am',
  //     linkreview: '/login'
  //   },
  //   {
  //     name: 'Jessica Bautista',
  //     hospital: 'Camp Lapu-Lapu Station Hospital',
  //     datetime: 'July 6, 2025 8:30am',
  //     linkreview: '/login'
  //   },
  //   {
  //     name: 'Maria Clara Santos',
  //     hospital: 'Adventist Hospital - Cebu, Inc.',
  //     datetime: 'July 9, 2025 9:55am',
  //     linkreview: '/login'
  //   },
  //   {
  //     name: 'Lisa Garcia',
  //     hospital: 'Barili District Hospital',
  //     datetime: 'July 10, 2025 9:10am',
  //     linkreview: '/login'
  //   },
  //   {
  //     name: 'Anna Cruz',
  //     hospital: 'Cebu South Medical Center',
  //     datetime: 'July 11, 2025 9:50am',
  //     linkreview: '/login'
  //   }
  // ]




  async ngOnInit(): Promise<void> {
    if( await this.authUser.goTo_login_pageIfNotValidAuthTokenAsync()==false ){
      this.mostFrequent9sentence.set(
        await firstValueFrom(this.statData.getMostFrequent9Sentences())
      );
      this.mostMistaken9sentence.set(
        await firstValueFrom(this.statData.getMostMistaken9Sentences())
      );


      /* make sentence be 10 not 9 quantity */
      this.mostFrequent9sentence.update(value=>({
        ...value,
        sentences: [
          ...value.sentences,
          {
            sentence: 'Others ...',
            quantity_rows: value.total_rows -sumArray(
              value.sentences.map(el=> el.quantity_rows)
            )
          }
        ]
      }));
      this.mostMistaken9sentence.update(value=>({
        ...value,
        sentences: [
          ...value.sentences,
          {
            sentence: 'Others ...',
            quantity_rows: value.total_rows -sumArray(
              value.sentences.map(el=> el.quantity_rows)
            )
          }
        ]
      }));


      this.mostFrequent9sentence.update(value=>({
        ...value,
        response_time_ms: Math.round(value.response_time_ms)/1000.0,
        accuracy: Math.round(value.accuracy*10000.0)/10000.0*100.0
      }));
      this.mostMistaken9sentence.update(value=>({
        ...value,
        response_time_ms: Math.round(value.response_time_ms)/1000.0,
        accuracy: Math.round(value.accuracy*10000.0)/10000.0*100.0
      }));


      /* percentage on rows */
      this.mostFrequentQuantityPercent.set(
        this.mostFrequent9sentence().sentences.map(el=>
          Math.round(
            (el.quantity_rows/this.mostFrequent9sentence().total_rows*100.0) *1000.0
          )/1000.0)
      );
      this.mostMistakenQuantityPercent.set(
        this.mostMistaken9sentence().sentences.map(el=>
          Math.round(
            (el.quantity_rows/this.mostMistaken9sentence().total_rows*100.0) *1000.0
          )/1000.0)
      );


      const totalRowsFrequent9: number= sumArray(this.mostFrequent9sentence()
          .sentences.map(el=> el.quantity_rows));
      const totalRowsMistaken9: number= sumArray(this.mostMistaken9sentence()
          .sentences.map(el=> el.quantity_rows));


      this.doughnut4frequentSentence.set([
        ...this.mostFrequent9sentence().sentences.map(el=> el.quantity_rows),
        this.mostFrequent9sentence().total_rows -totalRowsFrequent9
      ]);
      this.doughnut4mistakenSentence.set([
        ...this.mostMistaken9sentence().sentences.map(el=> el.quantity_rows),
        this.mostMistaken9sentence().total_rows -totalRowsMistaken9
      ]);
    }
  }
}
