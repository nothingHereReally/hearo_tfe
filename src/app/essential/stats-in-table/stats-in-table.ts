import { Component, input, InputSignal, OnInit } from '@angular/core';
import { TableColumnAccuracy, TableColumnStatusPatientVideo, TableColumnString, TableColumnURLLink, } from '../../model/table-column';
import { PieChartPercent } from '../../chart/pie-chart-percent/pie-chart-percent';
import { Button } from '../button/button';


@Component({
  selector: 'app-stats-in-table',
  imports: [
    Button,
    PieChartPercent
  ],
  templateUrl: './stats-in-table.html',
  styleUrl: './stats-in-table.css',
})
export class StatsInTable implements OnInit{
  public dataOnTable: InputSignal<Array<
      TableColumnString |
      TableColumnAccuracy |
      TableColumnStatusPatientVideo |
      TableColumnURLLink
  >>= input.required();




  ngOnInit(): void {
  }
}
