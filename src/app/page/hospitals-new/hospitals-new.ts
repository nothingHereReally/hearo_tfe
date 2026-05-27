import { Component, inject, signal, WritableSignal } from '@angular/core';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { Router } from '@angular/router';
import { Input } from '../../essential/input/input';
import { AddHospitalFacility, RowHospitalFacility } from '../../model/hospital-facility';
import { HospitalFacility } from '../../api-service/hospital-facility';
import { sleepAsync } from '../../model/tools';
import { environment as env } from '../../../environment/environment';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-hospitals-new',
  imports: [
    Header,
    Button,
    Input
  ],
  templateUrl: './hospitals-new.html',
  styleUrl: './hospitals-new.css',
})
export class HospitalsNew{
  private route: Router= inject(Router);


  private hospitalFacilityService: HospitalFacility= inject(HospitalFacility);
  protected addedSuccessMsg: WritableSignal<string>= signal('');
  protected warnings: WritableSignal<AddHospitalFacility>= signal({
    name: '',
    street: '',
    municipality: ''
  });
  protected newHospitalFacility: WritableSignal<AddHospitalFacility>= signal({
    name: '',
    street: '',
    municipality: ''
  });


  protected clickedBack(): void{
    this.route.navigate(['/hospitals']);
  }
  protected async clickedAddHospital(): Promise<void>{
    let allNotEmpty: boolean= true;
    if( this.newHospitalFacility().name=='' ){
      allNotEmpty= false;
      this.warnings.update(val=>({
        ...val,
        name: "Hospital Name can't be Empty"
      }));
      sleepAsync(env.TIME_ERROR_DISPLAY, ()=>{
        this.warnings.update(val=>({
          ...val,
          name: ""
        }));
      });
    }
    if( this.newHospitalFacility().street=='' ){
      allNotEmpty= false;
      this.warnings.update(val=>({
        ...val,
        street: "Street can't be Empty"
      }));
      sleepAsync(env.TIME_ERROR_DISPLAY, ()=>{
        this.warnings.update(val=>({
          ...val,
          street: ""
        }));
      });
    }
    if( this.newHospitalFacility().municipality=='' ){
      allNotEmpty= false;
      this.warnings.update(val=>({
        ...val,
        municipality: "Municipality can't be Empty"
      }));
      sleepAsync(env.TIME_ERROR_DISPLAY, ()=>{
        this.warnings.update(val=>({
          ...val,
          municipality: ""
        }));
      });
    }


    if( allNotEmpty ){
      let addedResponse: RowHospitalFacility= await firstValueFrom(this.hospitalFacilityService.addHospitalFacility(this.newHospitalFacility()));
      if( addedResponse!=null ){
        this.newHospitalFacility.set({
          name: '',
          street: '',
          municipality: ''
        });
        this.warnings.set({
          name: '',
          street: '',
          municipality: ''
        });
        this.addedSuccessMsg.set('New Hospital Facility Added. ✔');
        sleepAsync(env.TIME_ERROR_DISPLAY, ()=>{this.addedSuccessMsg.set('');});
      }
    }
  }
}
