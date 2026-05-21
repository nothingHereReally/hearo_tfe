import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { HospitalHead as HospitalHeadModel } from '../../model/hospital-head';
import { UserHospitalHead } from '../../api-service/user-hospital-head';
import { firstValueFrom } from 'rxjs';


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
  private userHospitalHeadService: UserHospitalHead= inject(UserHospitalHead);
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);
  private route: Router= inject(Router);
  protected hospitalHeadUser: WritableSignal<HospitalHeadModel|null>= signal(null);




  async ngOnInit(): Promise<void> {
    try{
      this.hospitalHeadUser.set(
        await firstValueFrom(
          this.userHospitalHeadService.getHospitalHeadById(
            Number(this.activatedRoute.snapshot.params['hhid'])
          )
        )
      );
      console.log(this.hospitalHeadUser());
    }catch(err){}
  }


  protected goBack(){
    this.route.navigate(['/hospital-head']);
  }
}
