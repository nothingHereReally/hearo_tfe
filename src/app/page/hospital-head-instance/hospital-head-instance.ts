import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { Input } from '../../essential/input/input';
import { EditHospitalHead, HospitalHead as HospitalHeadModel, RowHospitalHead } from '../../model/hospital-head';
import { UserHospitalHead } from '../../api-service/user-hospital-head';
import { firstValueFrom } from 'rxjs';
import { HospitalFacility } from '../../api-service/hospital-facility';
import { RowHospitalFacility } from '../../model/hospital-facility';
import { dateTimeFormatOption, sleepAsync } from '../../model/tools';
import { environment as env } from '../../../environment/environment';
import { ApiFile } from '../../api-service/api-file';


@Component({
  selector: 'app-hospital-head-instance',
  imports: [
    Header,
    Button,
    Input
  ],
  templateUrl: './hospital-head-instance.html',
  styleUrl: './hospital-head-instance.css',
})
export class HospitalHeadInstance implements OnInit{
  private hospitalFacilityService: HospitalFacility= inject(HospitalFacility);
  private userHospitalHeadService: UserHospitalHead= inject(UserHospitalHead);
  private apiFile: ApiFile= inject(ApiFile);


  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);
  private route: Router= inject(Router);
  protected hospitalHeadUser: WritableSignal<HospitalHeadModel|null>= signal(null);
  protected dateJoined: WritableSignal<string>= signal("");
  protected hospitalAddress: WritableSignal<string>= signal("");

  protected deleteConfirmationStep: WritableSignal<number>= signal(0);
  protected deleteConfirmationInput: WritableSignal<string>= signal("");




  async ngOnInit(): Promise<void> {
    let userHH: RowHospitalHead|null= null;
    try{
      userHH= await firstValueFrom(
        this.userHospitalHeadService.getHospitalHeadById(
          Number(this.activatedRoute.snapshot.params['hhid'])
        )
      );
    }catch(err){}
    if( userHH )
      this.hospitalHeadUser.set(this.userHospitalHeadService.getHospitalHeadFromRow(userHH));
      this.dateJoined.set(`${this.hospitalHeadUser()?.user?.date_joined.toLocaleString('en-US', dateTimeFormatOption)}`)
    if( this.hospitalHeadUser() && this.hospitalHeadUser()?.hospital_facility ){
      let hospitalFacility: RowHospitalFacility|null= await firstValueFrom(this.hospitalFacilityService.getHospitalFacilityById(this.hospitalHeadUser()?.hospital_facility!));
      if(hospitalFacility){
        this.hospitalAddress.set(`${hospitalFacility.street} ${hospitalFacility.municipality}`);
      }
    }
  }


  protected goBack(){
    this.route.navigate(['/hospital-head']);
  }
  protected async clickedDownloadAllFilesFromHospitalHead(){
    if( this.hospitalHeadUser() ){
      const zipBlob: Blob|null= await firstValueFrom(this.apiFile.getHospitalHeadDocumentsViaZipFile(this.hospitalHeadUser()!.user.id));
      if( zipBlob ){
        const url= window.URL.createObjectURL(zipBlob);
        const a= document.createElement('a');
        a.href= url;
        a.download= `hospital_head_${this.hospitalHeadUser()?.user.id}__${this.hospitalHeadUser()?.user.first_name}_${this.hospitalHeadUser()?.user.last_name}____documents.zip`;
        a.click();
        await sleepAsync(env.TIME_ERROR_DISPLAY/2.0);
        window.URL.revokeObjectURL(url);
      }else{
        console.log('no document files');
      }
    }
  }
  protected async clickedApproveAccount(): Promise<void>{
    if( this.hospitalHeadUser()!=null ){
      let approveAccount: EditHospitalHead= {
        account_approved: true,
        is_active: this.hospitalHeadUser()!.is_active,
        hospital_facility: this.hospitalHeadUser()!.hospital_facility
      };
      let editedUserHospitalHead: RowHospitalHead|null=await firstValueFrom(this.userHospitalHeadService.editHospitalHead(this.hospitalHeadUser()!.user.id, approveAccount));
      if( editedUserHospitalHead ){
        this.hospitalHeadUser.set(this.userHospitalHeadService.getHospitalHeadFromRow(editedUserHospitalHead));
      }
    }
  }
  protected async clickedToggleAccountActiveDeactivated(): Promise<void>{
    if( this.hospitalHeadUser() ){
      const toggleActiveDeactivatedAccount: EditHospitalHead= {
        account_approved: this.hospitalHeadUser()!.account_approved,
        is_active: this.hospitalHeadUser()!.is_active? false : true,
        hospital_facility: this.hospitalHeadUser()!.hospital_facility
      }
      let editedUserHospitalHead: RowHospitalHead|null= await firstValueFrom(
        this.userHospitalHeadService.editHospitalHead(
          this.hospitalHeadUser()!.user.id, toggleActiveDeactivatedAccount
        )
      );
      if( editedUserHospitalHead ){
        this.hospitalHeadUser.set(this.userHospitalHeadService.getHospitalHeadFromRow(editedUserHospitalHead));
      }
    }
  }

  protected cancelDeleteConfirmation(){
    this.deleteConfirmationStep.set(0);
    this.deleteConfirmationInput.set("");
  }

  protected async deleteHospitalHeadAccont(): Promise<void>{
    if( this.deleteConfirmationStep() == 0 ){
      this.deleteConfirmationStep.set(1);
    }else if( this.deleteConfirmationStep() == 1 ){
      this.deleteConfirmationStep.set(2);
    }else if( this.deleteConfirmationStep() == 2 ){
      if( this.deleteConfirmationInput() === "DELETE HOSPITAL HEAD USER" ){
        try{
          await firstValueFrom(this.userHospitalHeadService.deleteHospitalHead(this.hospitalHeadUser()!.user.id))
          this.deleteConfirmationStep.set(3);
          await sleepAsync(env.TIME_ERROR_DISPLAY);
          this.route.navigate(['/hospital-head']);
        }catch{}

      }
    }
  }
}

