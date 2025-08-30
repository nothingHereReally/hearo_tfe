import { Component, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';


import { TableHospitalHead } from '../../model/table-hospital-head';
import { TableNewSign } from '../../model/table-new-sign';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})
export class DataTable implements OnInit{
  readonly forWhat: InputSignal<string>= input.required<string>();
  readonly rowsContent: InputSignal<Array<TableHospitalHead | TableNewSign>>= input.required<Array<TableHospitalHead | TableNewSign>>();


  protected tableName: WritableSignal<string>= signal<string>('Hospital Account Request')
  public titles: WritableSignal<Array<string>>= signal<Array<string>>([
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
    }else if( this.forWhat()==this.validForWhat[1] ){
      this.tableName.set('Hospital Head Accounts')
      this.titles.set([
        'Name',
        'Hospital',
        'Joined',
        'Review'
      ]);
    }else if( this.forWhat()==this.validForWhat[2] ){
      this.tableName.set('Video Sign by patients Tablet')
      this.titles.set([
        'Username',
        'Hospital',
        'Status',
        'Review'
      ]);
    }
  }

  public getCol_name_xor_username(insRow: TableHospitalHead | TableNewSign): string{
    return ((insRow as TableHospitalHead).name || (insRow as TableNewSign).username);
  }
  public getCol_datetime_xor_status(insRow: TableHospitalHead | TableNewSign): string{
    let out: string|number= ((insRow as TableHospitalHead).datetime || (insRow as TableNewSign).status);
    if( typeof out === 'string'){
      return out;
    }
    if( this.forWhat()!=this.validForWhat[2] ){
      throw new TypeError(`forWhat must be ${this.validForWhat[2]}, due to having TableNewSign on rowsContent, but got ${this.forWhat()}`);
    }
    return out==0? 'Pending': (out==1? 'In Progress': 'Done');
  }
}
