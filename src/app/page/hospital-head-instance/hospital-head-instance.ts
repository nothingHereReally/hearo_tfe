import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { HospitalHead as HospitalHeadModel } from '../../model/hospital-head';


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
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);
  private route: Router= inject(Router);
  protected hospitalHeadUser: HospitalHeadModel= {
    user: {
      id: 0,
      email: "",
      username: "",
      password_last_modified: new Date(),
      first_name: "",
      last_name: "",
      date_joined: new Date(),
      last_login: new Date()
    },
    hospital_facility: 0,
    hospital_facility_name: "",
    other_hospital: null,
    account_approved: false,
    is_active: true,
    email_verified: true,
    profile_picture: null,
    last_update: new Date()
  };


  private userId: number= 0;


  ngOnInit(): void {
    this.userId= Number(this.activatedRoute.snapshot.params['hhid']);
    console.log(this.userId);
  }


  protected goBack(){
    this.route.navigate(['/hospital-head']);
  }
}
