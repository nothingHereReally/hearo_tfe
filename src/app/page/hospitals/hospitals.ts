import { Component, inject, signal, WritableSignal } from '@angular/core';


import { Header } from '../../essential/header/header';
import { TableColumnString, TableColumnURLLink } from '../../model/table-column';
import { Input } from '../../essential/input/input';
import { StatsInTable } from '../../essential/stats-in-table/stats-in-table';
import { Button } from '../../essential/button/button';
import { HospitalFacility } from '../../api-service/hospital-facility';
import { environment as env } from '../../../environment/environment';
import { ResponseHospitalFacility } from '../../model/hospital-facility';
import { dateTimeFormatOption, isEmptyOrAllSpace, sleepAsync } from '../../model/tools';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospitals',
  imports: [
    Header,
    Input,
    StatsInTable,
    Button
  ],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css'
})
export class Hospitals {





/* ----------------------------------- */
  private route: Router= inject(Router);


  private hospitalFacility: HospitalFacility= inject(HospitalFacility);


  protected searchNameOrAddress: WritableSignal<string>= signal('');
  protected searchWarning: WritableSignal<string>= signal('');
  protected dataSource: WritableSignal<Array<
    TableColumnString|TableColumnURLLink
  >>= signal([]);
  protected pageCurrentWhat: WritableSignal<number>= signal(0);
  protected pageTotalWhat: WritableSignal<number>= signal(0);





  private async __loadInitHospitalFacilities(): Promise<void>{
    const readHospitalFacility: ResponseHospitalFacility|null= await this.hospitalFacility.getHospitalFacilities(true);
    if( readHospitalFacility && readHospitalFacility.count!=0 ){


      this.pageCurrentWhat.set(1);
      this.pageTotalWhat.set(Math.ceil(readHospitalFacility.count/readHospitalFacility.results.length));


      this.write2dataSource(readHospitalFacility);
    }
  }
  private async __loadHospitalFacilities(pageWhat2Add: number=0): Promise<void>{
    const readHospitalFacility: ResponseHospitalFacility|null= await this.hospitalFacility.getHospitalFacilities();
    if( readHospitalFacility ){


      this.pageCurrentWhat.update(value=>value+pageWhat2Add);
      if( this.pageCurrentWhat()==1 )
        this.pageTotalWhat.set(Math.ceil(readHospitalFacility.count/readHospitalFacility.results.length));


      this.write2dataSource(readHospitalFacility);
    }
  }
  ngOnInit(): void {
    this.__loadInitHospitalFacilities();
  }


  protected async clickedSearch(): Promise<void>{
    if( ! isEmptyOrAllSpace(this.searchNameOrAddress()) ){
      const readHospitalFacility: ResponseHospitalFacility|null= await this.hospitalFacility.searchHospitalFacilities(
        this.searchNameOrAddress()
      )
      if( readHospitalFacility && readHospitalFacility.count!=0 ){
        this.pageCurrentWhat.set(1);
        this.pageTotalWhat.set(Math.ceil(
          readHospitalFacility.count/readHospitalFacility.results.length
        ));
        this.write2dataSource(readHospitalFacility);
      }else{
        this.searchWarning.set('No match found');
        sleepAsync(env.TIME_ERROR_DISPLAY, ()=>{this.searchWarning.set('');});
      }


    }else{
      await this.__loadInitHospitalFacilities();
    }
  }
  protected async clickedPrevPagination(): Promise<void>{
    if( this.pageCurrentWhat()!=1 && this.pageCurrentWhat()!=0 ){
      await this.hospitalFacility.goPrevHospitalFacilities();
      this.__loadHospitalFacilities(-1);
    }
  }
  protected async clickedNextPagination(): Promise<void>{
    if( this.pageCurrentWhat()!=this.pageTotalWhat() ){
      await this.hospitalFacility.goNextHospitalFacilities();
      this.__loadHospitalFacilities(1);
    }
  }




  private write2dataSource(readHospitalFacility: ResponseHospitalFacility): void{
    if( readHospitalFacility.count!=0 ){
      this.dataSource.set([
        {
          name: 'Name',
          type: 'string',
          data: readHospitalFacility.results.map(
            el=>`${el.name}`
          )
        },
        {
          name: 'Address',
          type: 'string',
          data: readHospitalFacility.results.map(
            el=>`${el.street} ${el.municipality}`
          )
        },
        {
          name: 'Date Added',
          type: 'string',
          data: readHospitalFacility.results.map(
            el=>`${el.date_added.toLocaleString('en-US', dateTimeFormatOption)}`
          )
        },
        {
          name: 'Review',
          type: 'urlLink',
          data: readHospitalFacility.results.map(
            el=>{
              return {
                link: `/hospitals/${el.id}`,
                label: 'View Details',
                colorButton: 'blue',
              }
            }
          )
        },
      ]);
    }
  }




  protected clickedAdd(): void{
    this.route.navigate(['/hospitals/new']);
  }
}
