import { Component, input, InputSignal, OnInit, signal, Signal } from '@angular/core';


import { TableHospitalHead } from '../../model/table-hospital-head';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})
export class DataTable implements OnInit{
  readonly forWhat: InputSignal<string>= input.required<string>();
  readonly rowsContent: InputSignal<Array<TableHospitalHead>>= input.required<Array<TableHospitalHead>>();


  protected tableName: Signal<string>= signal<string>('Hospital Head Request')
  public titles: Signal<Array<string>>= signal<Array<string>>([
    'Name',
    'Hospital',
    'Date and Time',
    'Review'
  ])
  private validForWhat: Array<string>= [
    'hospital_head_request',
    'all_hospital_head_accounts',
    'new_sign_videos'
  ]

  ngOnInit(): void{
    if( !this.validForWhat.includes(this.forWhat()) ){
      throw new TypeError(`forWhat can only be ${this.validForWhat}, due to forWhat is ${this.forWhat}`);
    }

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
