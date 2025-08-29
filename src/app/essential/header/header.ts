import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public clickHome(): void{
    console.log(`hello from click home ${Math.random()}`);
  }
  public clickHospitalHead(): void{
    console.log(`hello from click Hospital Head Acc list ${Math.random()}`);
  }
  public clickNewSign(): void{
    console.log(`hello from click New Sign Vids ${Math.random()}`);
  }
}
