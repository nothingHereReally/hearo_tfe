import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';


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


  private userId: number= 0;


  ngOnInit(): void {
    this.userId= Number(this.activatedRoute.snapshot.params['hhid']);
    console.log(this.userId);
  }


  protected goBack(){
    this.route.navigate(['/hospital-head']);
  }
}
