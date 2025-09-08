import { Component, inject, signal, WritableSignal } from '@angular/core';


import { LoginField } from '../../model/login-field';
import { TIME_ERROR_DISPLAY } from '../../model/constant';
import { AuthUser } from '../../api-service/auth-user';
import { Token } from '../../model/token';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authUser: AuthUser= inject(AuthUser);
  protected hearoUser: WritableSignal<LoginField>= signal({
    username: '',
    password: ''
  });
  protected warnings: WritableSignal<LoginField>= signal({
    username: '',
    password: ''
  });


  protected loggingIn(): void{
    if( this.hearoUser().username!='' && this.hearoUser().password!='' ){
      this.authUser.userLogin(this.hearoUser()).subscribe({
        next: (r: Token)=>{
          this.authUser.saveAccountToken(r);
        },
        error: (err: any)=>{
          this.warnings.update(value=>{ value.password="Incorrect Username or Password"; return value });
          setTimeout(()=>{
            this.warnings.update(value=>{ value.password=""; return value });
          }, TIME_ERROR_DISPLAY);
        },
        complete: ()=>{
        }
      });
    }
    if( this.hearoUser().username=='' ){
      this.warnings.update(value=>{ value.username="Please fill your Username"; return value });
      setTimeout(()=>{
        this.warnings.update(value=>{ value.username=""; return value });
      }, TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().password=='' ){
      this.warnings.update(value=>{ value.password="Please fill your Password"; return value });
      setTimeout(()=>{
        this.warnings.update(value=>{ value.password=""; return value });
      }, TIME_ERROR_DISPLAY);
    }
  }
}
