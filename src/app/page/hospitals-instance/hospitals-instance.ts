import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { firstValueFrom } from 'rxjs';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { Input } from '../../essential/input/input';
import { AddHospitalFacility, HospitalFacility, RowHospitalFacility } from '../../model/hospital-facility';
import { HospitalFacility as HospitalFacilityService } from '../../api-service/hospital-facility';
import { environment as env } from '../../../environment/environment';
import { sleepAsync } from '../../model/tools';


@Component({
  selector: 'app-hospitals-instance',
  imports: [
    Header,
    Button,
    Input
  ],
  templateUrl: './hospitals-instance.html',
  styleUrl: './hospitals-instance.css',
})
export class HospitalsInstance implements OnInit{
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);


  private hospitalFacilityService: HospitalFacilityService= inject(HospitalFacilityService);
  private route: Router= inject(Router);
  protected editHospitalFacility: WritableSignal<HospitalFacility>= signal({
    id: -1,
    name: '',
    street: '',
    municipality: '',
    date_added: new Date(),
    last_update: new Date()
  });
  protected warnings: WritableSignal<AddHospitalFacility>= signal({
    name: '',
    street: '',
    municipality: ''
  });
  protected editSuccessMsg: WritableSignal<string>= signal('');
  protected readOnlyOrEdit: WritableSignal<'is-readonly'|'is-not-readonly'>= signal('is-readonly');
  protected deleteConfirmationStep: WritableSignal<number>= signal(0);
  protected deleteConfirmationInput: WritableSignal<string>= signal('');


  public async ngOnInit(): Promise<void> {
    try{
      const hospitalFacilityId: number= Number(this.activatedRoute.snapshot.params['hfid']);
      if( ! Number.isNaN(hospitalFacilityId) ){
        this.editHospitalFacility.update(val=>({
          ...val,
          id: hospitalFacilityId
        }));
        this.__loadHospitalFacility();
      }
    }catch(err){}
  }


  protected clickedBack(): void{
    this.route.navigate(['/hospitals']);
  }
  protected async clickedEditOrUpdate(): Promise<void>{
    if( this.readOnlyOrEdit()==='is-readonly' ){
      this.readOnlyOrEdit.set('is-not-readonly');
    }else if( await this.__updateHospitalFacility() ){
      this.readOnlyOrEdit.set('is-readonly');
    }
  }
  protected clickedCancelEdit(): void{
    this.readOnlyOrEdit.set('is-readonly');
    this.__loadHospitalFacility();
  }


  private async __updateHospitalFacility(): Promise<boolean>{
    if( this.editHospitalFacility().id!=-1 ){
      let isUpdateAllowed: boolean= true;
      if( this.editHospitalFacility().name=='' ){
        this.warnings.update(val=>({
          ...val,
          name: "Hospital Name can't be emtpy"
        }));
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{
            this.warnings.update(val=>({
              ...val,
              name: ''
            }))
          }
        )
        isUpdateAllowed= false;
      }

      if( this.editHospitalFacility().street=='' ){
        this.warnings.update(val=>({
          ...val,
          street: "Hospital Street can't be emtpy"
        }));
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{
            this.warnings.update(val=>({
              ...val,
              street: ''
            }))
          }
        )
        isUpdateAllowed= false;
      }

      if( this.editHospitalFacility().municipality=='' ){
        this.warnings.update(val=>({
          ...val,
          municipality: "Hospital Municipality can't be emtpy"
        }));
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{
            this.warnings.update(val=>({
              ...val,
              municipality: ''
            }))
          }
        )
        isUpdateAllowed= false;
      }


      if( isUpdateAllowed ){
        const updated: RowHospitalFacility= await firstValueFrom(this.hospitalFacilityService.updateHospitalFacility(
          this.editHospitalFacility().id,
          {
            name: this.editHospitalFacility().name,
            street: this.editHospitalFacility().street,
            municipality: this.editHospitalFacility().municipality
          }
        ));
        if( updated.id==this.editHospitalFacility().id ){
          this.editHospitalFacility.set(
            this.hospitalFacilityService.getHospitalFacilityFromRow(updated)
          );
        }
      }
      return isUpdateAllowed;
    }
    return false;
  }
  private async __loadHospitalFacility(): Promise<void>{
    if( this.editHospitalFacility().id!=-1 ){
      const rawHospitalFacility: RowHospitalFacility|null= await firstValueFrom(
        this.hospitalFacilityService.getHospitalFacilityById(this.editHospitalFacility().id)
      );
      if( rawHospitalFacility ){
        this.editHospitalFacility.set(
          this.hospitalFacilityService.getHospitalFacilityFromRow(rawHospitalFacility)
        );
      }else{
        this.editHospitalFacility.update(val=>({
          ...val,
          id: -1
        }));
      }
    }
  }


  protected clickedCancelDelete(): void{
    this.deleteConfirmationStep.set(0);
  }
  protected async clickedDelete(): Promise<void>{
    if( this.deleteConfirmationStep()==0 ){
      this.deleteConfirmationStep.set(1);
    }else if( this.deleteConfirmationStep()==1 ){
      this.deleteConfirmationStep.set(2);
    }else if( this.deleteConfirmationStep()==2 &&
        this.deleteConfirmationInput()==='DELETE HOSPITAL FACILITY' ){
        this.deleteConfirmationInput.set('');


        try{
          await firstValueFrom(this.hospitalFacilityService.deleteHospitalFacility(this.editHospitalFacility().id));
          this.deleteConfirmationStep.set(3);
          await sleepAsync(env.TIME_ERROR_DISPLAY/2);
          this.route.navigate(['/hospitals']);
        }catch(err){}
    }
  }
}
