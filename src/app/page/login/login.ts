import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';


import { firstValueFrom } from 'rxjs';


import { LoginField } from '../../model/login-field';
import { environment as env } from '../../../environment/environment';
import { AuthUser } from '../../api-service/auth-user';
import { Token } from '../../model/token';

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
    this.authUser.goTo_home_pageIfValidAuthTokenAsync()
  }


  private __showWarnings(): void{
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
  protected async loggingIn(): Promise<void>{
    if( this.hearoUser().username!='' && this.hearoUser().password!='' ){
      let response: Token|any= null;
      try{
        response= await firstValueFrom(this.authUser.userLoginHttpPost(this.hearoUser()));
        this.authUser.saveAccountToken(response)
        this.authUser.deleteToken_AccessQRAccount();
        this.router.navigate(['/home']);
      }catch(err: any){
        this.warnings.update(value=>{ value.password=err.error.details; return value; });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.password=''; return value; });
        }, env.TIME_ERROR_DISPLAY);
      }

    }else{ this.__showWarnings(); }
  }
}
