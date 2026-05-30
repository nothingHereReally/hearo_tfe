import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../essential/header/header';
import { Button } from '../../essential/button/button';
import { Input } from '../../essential/input/input';
import { AddHospitalFacility, HospitalFacility, RowHospitalFacility } from '../../model/hospital-facility';
import { HospitalFacility as HospitalFacilityService } from '../../api-service/hospital-facility';
import { firstValueFrom } from 'rxjs';

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


  public async ngOnInit(): Promise<void> {
    try{
      const hospitalFacilityId: number= Number(this.activatedRoute.snapshot.params['hfid']);
      if( ! Number.isNaN(hospitalFacilityId) ){
        console.log('asdfasdf asdasd');
        const rawHospitalFacility: RowHospitalFacility|null= await firstValueFrom(
          this.hospitalFacilityService.getHospitalFacilityById(hospitalFacilityId)
        );
        if( rawHospitalFacility ){
          this.editHospitalFacility.set(
            this.hospitalFacilityService.getHospitalFacilityFromRow(rawHospitalFacility)
          );
        }
      }
    }catch(err){}
  }


  protected clickedBack(): void{
    this.route.navigate(['/hospitals']);
  }
  protected clickedUpdate(): void{
    console.log(`update -->`);
    console.log(this.editHospitalFacility());
  }
  protected clickedDelete(): void{
    console.log(`delete --> ${this.editHospitalFacility().name}`);
  }
}
