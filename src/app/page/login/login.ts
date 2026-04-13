import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';


import { firstValueFrom } from 'rxjs';


import { Input } from '../../essential/input/input';


import { LoginField } from '../../model/login-field';
import { environment as env } from '../../../environment/environment';
import { AuthUser } from '../../api-service/auth-user';
import { Token } from '../../model/token';
import { sleepAsync } from '../../model/tools';
import { Button } from '../../essential/button/button';

@Component({
  selector: 'app-login',
  imports: [
    Input,
    Button,
  ],
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


  private async __showWarnings2fillUp(): Promise<void>{
    if( this.hearoUser().username=='' ){
      this.warnings.update(value=>{ value.username="Please fill your Username"; return value });
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.warnings.update(value=>{ value.username=""; return value });}
      );

    }
    if( this.hearoUser().password=='' ){
      this.warnings.update(value=>{ value.password="Please fill your Password"; return value });
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.warnings.update(value=>{ value.password=""; return value });}
      );
    }
  }
  protected async loggingIn(): Promise<void>{
    if( this.hearoUser().username!='' && this.hearoUser().password!='' ){
      let response: Token|any= null;
      try{
        response= await firstValueFrom(this.authUser.userLoginHttpPost(this.hearoUser()));
        this.authUser.saveAccountToken(response)
        this.authUser.deleteTokenAccessQRAccount();
        this.router.navigate(['/home/sentence']);
      }catch(err: any){
        this.warnings.update(value=>{ value.password=err.error.details; return value; });
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{this.warnings.update(value=>{ value.password=''; return value; });}
        );
      }

    }else{ this.__showWarnings2fillUp(); }
  }
}
