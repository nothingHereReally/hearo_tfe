import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  readonly whatState: InputSignal<string>= input<string>('');

  private router= inject(Router);
  protected homeStyle: WritableSignal<string>= signal<string>('style-outline');
  protected hospitalHeadStyle: WritableSignal<string>= signal<string>('style-outline');
  protected hospitalStyle: WritableSignal<string>= signal<string>('style-outline');
  protected newSignStyle: WritableSignal<string>= signal<string>('style-outline');


  ngOnInit(): void {
    let validState: Array<string>= [
      'home',
      'hospital_head',
      'hospitals',
      'new_sign'
    ];
    if( !validState.includes(this.whatState()) && this.whatState()!='' ){
      throw new TypeError(`whatState can only be empty '' or 1 of the following ${validState}, due to whatState is ${this.whatState()}`);
    }
    if( this.whatState()==validState[0] ){
      this.homeStyle.set('style-solid');
    }else if( this.whatState()==validState[1] ){
      this.hospitalHeadStyle.set('style-solid');
    }else if( this.whatState()==validState[2] ){
      this.hospitalStyle.set('style-solid');
    }else if( this.whatState()==validState[3] ){
      this.newSignStyle.set('style-solid');
    }/* else means no change needed */
  }


  public clickHome(): void{
    this.router.navigate(['/home']);
  }
  public clickHospitalHead(): void{
    this.router.navigate(['/home']);
  }
  public clickHospitals(): void{
    this.router.navigate(['/home']);
  }
  public clickNewSign(): void{
    this.router.navigate(['/home']);
  }


  public logout(): void{
    console.log(`logout clicked ${Math.random()}`);
  }
  public clickedProfile(): void{
    console.log(`clicked profile ${Math.random()}`);
  }
}
