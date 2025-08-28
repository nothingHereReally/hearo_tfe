import { Component, input, OnInit } from '@angular/core';
import { DataTableTitle } from '../../model/data-table-title';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})
export class DataTable implements OnInit{
  readonly tableName= input<string>()
  readonly titles= input<Array<DataTableTitle>>()
  readonly rowsContent= input<Array< Array<string> >>()

  ngOnInit(): void{
    console.log(`tableName ${this.tableName()}`);
    let titleArr: Array<DataTableTitle>= this.titles() || [];
    titleArr.forEach(i=>{
      console.log(`titles ________________________${i['name']}`);
    });
    let rows: Array< Array<string> >= this.rowsContent() || [];
    rows.forEach(i=>{
      console.log(`rows be __ ${i[0]}__ ${i[1]}__ ${i[2]}__ ${i[3]}`);
    });
  }
}
