import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


import { LoginField } from '../../model/login-field';
import { environment as env } from '../../../environment/environment';
import { AuthUser } from '../../api-service/auth-user';
import { Token } from '../../model/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  private authUser: AuthUser= inject(AuthUser);
  private router: Router= inject(Router);


  protected hearoUser: WritableSignal<LoginField>= signal({
    username: '',
    password: ''
  });
  protected warnings: WritableSignal<LoginField>= signal({
    username: '',
    password: ''
  });


  ngOnInit(): void {
    this.authUser.goHomeIfValidAuthToken()
  }


  protected loggingIn(): void{
    if( this.hearoUser().username!='' && this.hearoUser().password!='' ){
      this.authUser.userLogin(this.hearoUser()).subscribe({
        next: (r: Token)=>{
          this.authUser.saveAccountToken(r);
          this.router.navigate(['/home']);
        },
        error: (err: any)=>{
          this.warnings.update(value=>{ value.password="Incorrect Username or Password"; return value });
          setTimeout(()=>{
            this.warnings.update(value=>{ value.password=""; return value });
          }, env.TIME_ERROR_DISPLAY);
        },
        complete: ()=>{
        }
      });
    }
    if( this.hearoUser().username=='' ){
      this.warnings.update(value=>{ value.username="Please fill your Username"; return value });
      setTimeout(()=>{
        this.warnings.update(value=>{ value.username=""; return value });
      }, env.TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().password=='' ){
      this.warnings.update(value=>{ value.password="Please fill your Password"; return value });
      setTimeout(()=>{
        this.warnings.update(value=>{ value.password=""; return value });
      }, env.TIME_ERROR_DISPLAY);
    }
  }
}
