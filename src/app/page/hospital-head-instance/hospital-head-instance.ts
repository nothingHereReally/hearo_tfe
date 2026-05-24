import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { EditHospitalHead, HospitalHead as HospitalHeadModel, RowHospitalHead } from '../../model/hospital-head';
import { UserHospitalHead } from '../../api-service/user-hospital-head';
import { firstValueFrom } from 'rxjs';
import { HospitalFacility } from '../../api-service/hospital-facility';
import { RowHospitalFacility } from '../../model/hospital-facility';
import { dateTimeFormatOption } from '../../model/tools';


@Component({
  selector: 'app-hospital-head-instance',
  imports: [
    Header,
    Button
  ],
  templateUrl: './hospital-head-instance.html',
  styleUrl: './hospital-head-instance.css',
})
export class HospitalHeadInstance implements OnInit{
  private hospitalFacilityService: HospitalFacility= inject(HospitalFacility);
  private userHospitalHeadService: UserHospitalHead= inject(UserHospitalHead);


  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);
  private route: Router= inject(Router);
  protected hospitalHeadUser: WritableSignal<HospitalHeadModel|null>= signal(null);
  protected dateJoined: WritableSignal<string>= signal("");
  protected hospitalAddress: WritableSignal<string>= signal("");




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
  protected clickedDownloadAllFilesFromHospitalHead(){
    console.log(`clicked download all files ${Math.random()}`);
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
  protected deleteHospitalHeadAccont(){
    console.log(`clicked delete hospital head account ${Math.random()}`);
  }
}
