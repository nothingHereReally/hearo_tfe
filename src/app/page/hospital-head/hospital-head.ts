import { Component, signal, WritableSignal } from '@angular/core';


import { Header } from '../../essential/header/header';
import { TableColumnAccuracy, TableColumnStatusPatientVideo, TableColumnString, TableColumnURLLink } from '../../model/table-column';
import { StatsInTable } from '../../essential/stats-in-table/stats-in-table';
import { Input } from '../../essential/input/input';
import { Button } from '../../essential/button/button';


@Component({
  selector: 'app-hospital-head',
  imports: [
    Header,
    StatsInTable,
    Input,
    Button
  ],
  templateUrl: './hospital-head.html',
  styleUrl: './hospital-head.css'
})
export class HospitalHead {
  protected searchHospitalOrAccountName: WritableSignal<string>= signal('');
  protected dataSource: WritableSignal<Array<TableColumnString|TableColumnAccuracy|TableColumnStatusPatientVideo|TableColumnURLLink>>= signal([
    {
      name: 'Name',
      data: [
        'Liza Mae Villanueva',
        'Jessica Bautista',
        'Maria Clara Santos',
        'Lisa Garcia',
        'Anna Cruz',
      ],
      type: 'string'
    },
    {
      name: 'Hospital',
      data: [
        'Cebu City Medical Center',
        'Camp Lapu-Lapu Station Hospital ',
        'Adventist Hospital - Cebu, Inc.',
        'Barili District Hospital',
        'Cebu South Medical Center',
      ],
      type: 'string'
    },
    {
      name: 'Joined',
      data: [
        'July 4, 2025 8:50am',
        'July 6, 2025 8:30am',
        'July 9, 2025 9:55am',
        'July 10, 2025 9:10am',
        'July 11, 2025 9:50am',
      ],
      type: 'string'
    },
    {
      name: 'Review',
      data: [
        {
          link: '/account-profile',
          label: 'Approval',
          colorButton: 'red'
        },
        {
          link: '/account-profile',
          label: 'Approval',
          colorButton: 'red'
        },
        {
          link: '/account-profile',
          label: 'View Details',
          colorButton: 'blue'
        },
        {
          link: '/account-profile',
          label: 'View Details',
          colorButton: 'blue'
        },
        {
          link: '/account-profile',
          label: 'View Details',
          colorButton: 'blue'
        },
      ],
      type: 'urlLink'
    }
  ]);


  protected clickedSearch(): void{
    console.log(`hello search: ${this.searchHospitalOrAccountName()} -- ${Math.random()}`)
  }
  protected clickedPrevPagination(): void{
    console.log(`clicked previous pagination -- ${Math.random()}`)
  }
  protected clickedNextPagination(): void{
    console.log(`clicked next pagination -- ${Math.random()}`)
  }
}
