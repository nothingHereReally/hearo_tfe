import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { Input } from '../../essential/input/input';
import { AddHospitalFacility, HospitalFacility } from '../../model/hospital-facility';

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


  private route: Router= inject(Router);
  protected editHospitalFacility: WritableSignal<HospitalFacility>= signal({
    id: 0,
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


  async ngOnInit(): Promise<void> {
    try{
      console.log(Number(this.activatedRoute.snapshot.params['hfid']));
    }catch(err){}
  }


  protected clickedBack(): void{
    this.route.navigate(['/hospitals']);
  }
  protected clickedUpdate(): void{
    console.log(`update -->`);
    console.log(this.editHospitalFacility());
  }
}
