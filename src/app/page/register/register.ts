import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Token } from '../../model/token';
import { AuthUser } from '../../api-service/auth-user';
import { RegisterUser } from '../../model/register-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  protected warning_firstname: WritableSignal<string>= signal('warning first name');
  protected warning_lastname: WritableSignal<string>= signal('warning last name');
  protected warning_email: WritableSignal<string>= signal('warning email');
  protected warning_password: WritableSignal<string>= signal('warning password');
  protected warning_rpassword: WritableSignal<string>= signal('warning retype password');

  protected hearoUser: WritableSignal<RegisterUser>= signal({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    retype_password: ''
  });


  private authTokenQR: Token= {
    access: '',
    refresh: ''
  };


  private authUser= inject(AuthUser);
  private router= inject(Router);

  ngOnInit(): void {
    this.authTokenQR= this.authUser.getToken_AccessQRAccount()==null? this.authTokenQR: this.authUser.getToken_AccessQRAccount()!;
    this.__checkToken();
    console.log("token: ", this.authTokenQR);
  }
  private __checkToken(): void{
    if( this.authTokenQR.access=='' || this.authTokenQR.refresh=='' ){
      this.router.navigate(['/verify-to-register'])
    }
  }
}
