import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


import { Header } from '../../essential/header/header';
import { TableColumnAccuracy, TableColumnStatusPatientVideo, TableColumnString, TableColumnURLLink } from '../../model/table-column';
import { StatsInTable } from '../../essential/stats-in-table/stats-in-table';
import { Input } from '../../essential/input/input';
import { Button } from '../../essential/button/button';
import { UserHospitalHead } from '../../api-service/user-hospital-head';
import { ResponseHospitalHead } from '../../model/hospital-head';
import { dateTimeFormatOption, isEmptyOrAllSpace } from '../../model/tools';


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
export class HospitalHead implements OnInit{
  private userHospitalHead: UserHospitalHead= inject(UserHospitalHead);


  protected searchHospitalOrAccountName: WritableSignal<string>= signal('');
  protected dataSource: WritableSignal<Array<
    TableColumnString|TableColumnAccuracy|TableColumnStatusPatientVideo|TableColumnURLLink
  >>= signal([]);
  protected pageCurrentWhat: WritableSignal<number>= signal(0);
  protected pageTotalWhat: WritableSignal<number>= signal(0);





  private async __loadInitHospitalHeads(): Promise<void>{
    const readHospitaHeads: ResponseHospitalHead|null= await this.userHospitalHead.getHospitalHeads(true);
    if( readHospitaHeads && readHospitaHeads.count!=0 ){


      this.pageCurrentWhat.set(1);
      this.pageTotalWhat.set(Math.ceil(readHospitaHeads.count/readHospitaHeads.results.length));


      this.write2dataSource(readHospitaHeads);
    }
  }
  private async __loadHospitalHeads(pageWhat2Add: number=0): Promise<void>{
    const readHospitaHeads: ResponseHospitalHead|null= await this.userHospitalHead.getHospitalHeads();
    if( readHospitaHeads ){


      this.pageCurrentWhat.update(value=>value+pageWhat2Add);
      this.pageTotalWhat.set(Math.ceil(readHospitaHeads.count/readHospitaHeads.results.length));


      this.write2dataSource(readHospitaHeads);
    }
  }
  ngOnInit(): void {
    this.__loadInitHospitalHeads();
  }


  protected async clickedSearch(): Promise<void>{
    if( ! isEmptyOrAllSpace(this.searchHospitalOrAccountName()) ){
      const readHospitaHeads: ResponseHospitalHead|null= await this.userHospitalHead.searchHospitalHeads(
        this.searchHospitalOrAccountName()
      )
      if( readHospitaHeads && readHospitaHeads.count!=0 ){
        this.pageCurrentWhat.set(1);
        this.pageTotalWhat.set(Math.ceil(
          readHospitaHeads.results.length/readHospitaHeads.count
        ));
        this.write2dataSource(readHospitaHeads);
      }


    }else{
      await this.__loadInitHospitalHeads();
    }
  }
  protected async clickedPrevPagination(): Promise<void>{
    if( this.pageCurrentWhat()!=1 && this.pageCurrentWhat()!=0 ){
      await this.userHospitalHead.goPrevHospitalHeads();
      this.__loadHospitalHeads(-1);
    }
  }
  protected async clickedNextPagination(): Promise<void>{
    if( this.pageCurrentWhat()!=this.pageTotalWhat() ){
      await this.userHospitalHead.goNextHospitalHeads();
      this.__loadHospitalHeads(1);
    }
  }




  private write2dataSource(readHospitaHeads: ResponseHospitalHead): void{
    if( readHospitaHeads.count!=0 ){
      this.dataSource.set([
        {
          name: 'Name',
          type: 'string',
          data: readHospitaHeads.results.map(
            el=>`${el.user.first_name} ${el.user.last_name}`
          )
        },
        {
          name: 'Hospital',
          type: 'string',
          data: readHospitaHeads.results.map(
            el=>`${el.hospital_facility_name}`
          )
        },
        {
          name: 'Joined',
          type: 'string',
          data: readHospitaHeads.results.map(
            el=>`${el.user.date_joined.toLocaleString('en-US', dateTimeFormatOption)}`
          )
        },
        {
          name: 'Review',
          type: 'urlLink',
          data: readHospitaHeads.results.map(
            el=>{
              return {
                link: '/account-profile',
                label: el.account_approved? 'View Details':'Approval',
                colorButton: el.account_approved? 'blue':'red',
              }
            }
          )
        },
      ]);
    }
  }
}
