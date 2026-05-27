import { Component, inject, signal, WritableSignal } from '@angular/core';


import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { Router } from '@angular/router';
import { Input } from '../../essential/input/input';
import { AddHospitalFacility } from '../../model/hospital-facility';


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


  protected newHospitalFacility: WritableSignal<AddHospitalFacility>= signal({
    name: '',
    street: '',
    municipality: ''
  });


  protected clickedBack(): void{
    this.route.navigate(['/hospitals']);
  }
  protected clickedAddHospital(): void{
    console.log(this.newHospitalFacility());
    console.log(`hello add, ${Math.random()}`);
  }
}
