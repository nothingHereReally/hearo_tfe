import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router= inject(Router);


  public clickHome(): void{
    this.router.navigate(['/home']);
  }
  public clickHospitalHead(): void{
    this.router.navigate(['/home']);
  }
  public clickNewSign(): void{
    this.router.navigate(['/home']);
  }
}
