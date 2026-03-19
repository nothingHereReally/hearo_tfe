import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit{
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);
  private resetPasswordPath: string= '/reset-password/';


  ngOnInit(): void {
    this.resetPasswordPath= `${this.resetPasswordPath}${this.activatedRoute.snapshot.params['userb64']}/`;
    this.resetPasswordPath= `${this.resetPasswordPath}${this.activatedRoute.snapshot.params['usertoken']}/`;
    console.log(this.resetPasswordPath);
  }
}
