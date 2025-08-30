import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router= inject(Router);
  protected homeStyle: WritableSignal<string>= signal<string>('style-outline');
  protected hospitalHeadStyle: WritableSignal<string>= signal<string>('style-outline');
  protected hospitalStyle: WritableSignal<string>= signal<string>('style-outline');
  protected newSignStyle: WritableSignal<string>= signal<string>('style-outline');


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
