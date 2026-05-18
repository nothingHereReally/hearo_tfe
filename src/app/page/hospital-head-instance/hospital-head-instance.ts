import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Header } from '../../essential/header/header';


@Component({
  selector: 'app-hospital-head-instance',
  imports: [
    Header
  ],
  templateUrl: './hospital-head-instance.html',
  styleUrl: './hospital-head-instance.css',
})
export class HospitalHeadInstance implements OnInit{
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);


  private userId: number= 0;


  ngOnInit(): void {
    this.userId= Number(this.activatedRoute.snapshot.params['hhid']);
    console.log(this.userId);
  }
}
