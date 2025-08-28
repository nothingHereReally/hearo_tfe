import { Component, input, OnInit, signal, Signal } from '@angular/core';


import { TableHospitalHead } from '../../model/table-hospital-head';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})
export class DataTable implements OnInit{
  readonly tableName: Signal<string>= signal<string>('Hospital Head Request')
  readonly titles: Signal<Array<string>>= signal<Array<string>>([
    'Name',
    'Hospital',
    'Date and Time',
    'Review'
  ])
  readonly rowsContent= input.required<Array<TableHospitalHead>>()

  ngOnInit(): void{
    console.log(`tableName ${this.tableName()}`);
    let titleArr: Array<string>= this.titles() || [];
    titleArr.forEach(i=>{
      console.log(`titles ________________________${i}`);
    });
    let rows: Array< TableHospitalHead >= this.rowsContent() || [];
    rows.forEach(i=>{
      console.log(`rows be __ ${i.name}__ ${i.hospital}__ ${i.datetime}__ ${i.linkreview}`);
    });
  }
}
