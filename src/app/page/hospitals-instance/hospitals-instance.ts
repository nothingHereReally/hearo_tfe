import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hospitals-instance',
  imports: [],
  templateUrl: './hospitals-instance.html',
  styleUrl: './hospitals-instance.css',
})
export class HospitalsInstance implements OnInit{
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);


  async ngOnInit(): Promise<void> {
    try{
      console.log(Number(this.activatedRoute.snapshot.params['hfid']));
    }catch(err){}
  }
}
