import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TableColumnAccuracy, TableColumnStatusPatientVideo, TableColumnString, TableColumnURLLink, } from '../../model/table-column';


@Component({
  selector: 'app-stats-in-table',
  imports: [
  ],
  templateUrl: './stats-in-table.html',
  styleUrl: './stats-in-table.css',
})
export class StatsInTable implements OnInit{
  dataSource: WritableSignal<Array<TableColumnString | TableColumnAccuracy | TableColumnStatusPatientVideo | TableColumnURLLink>>= signal([
    {
      name: 'string column',
      data: [
        'row 1',
        '2nd row',
        'row 3',
        '4th row',
        'row 5',
      ],
      type: 'string'
    },
    {
      name: 'accuracy high column',
      accuracyType: 'goodHigh',
      data: [0.91, 0.84, 0.75, 0.60, 0.55],
      type: 'accuracy'
    },
    {
      name: 'accuracy low column',
      accuracyType: 'goodLow',
      data: [0.53, 0.62, 0.8, 0.82, 0.84],
      type: 'accuracy'
    },
    {
      name: 'status patient video',
      data: [
        "In Progress",
        "Pending",
        "Done",
        "Pending",
        "In Progress"
      ],
      type: 'statusPatientVideo'
    },
    {
      name: 'url link column',
      data: [
        {
          link: '/account-profile',
          label: 'Go fuck ur self',
          colorButton: 'red'
        },
        {
          link: '/account-profile',
          label: 'Fuck Off',
          colorButton: 'blue'
        },
        {
          link: '/account-profile',
          label: 'Fuck this stupid life',
          colorButton: 'blue'
        },
        {
          link: '/account-profile',
          label: 'fuck life',
          colorButton: 'red'
        },
        {
          link: '/account-profile',
          label: 'fuck this',
          colorButton: 'blue'
        },
      ],
      type: 'urlLink'
    }
  ]);




  ngOnInit(): void {
  }
}
