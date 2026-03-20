import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { firstValueFrom } from 'rxjs';


import { AuthUser } from '../../api-service/auth-user';
import { environment as env } from '../../../environment/environment';
import { ResetPasswordField, ResetPasswordResponse } from '../../model/account';
import { sleepAsync } from '../../model/tools';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit{
  private authUser: AuthUser= inject(AuthUser);
  private activatedRoute: ActivatedRoute= inject(ActivatedRoute);
  private resetPasswordPath: string= 'api/reset-password/';
  protected passwordWarnings: WritableSignal<Array<string>>= signal([]);
  protected successMessage: WritableSignal<string>= signal('');


  protected resetPassword: WritableSignal<ResetPasswordField>= signal({
    password: '',
    retype_password: ''
  })


  ngOnInit(): void {
    this.authUser.goTo_home_pageIfValidAuthTokenAsync();
    this.resetPasswordPath= `${this.resetPasswordPath}${this.activatedRoute.snapshot.params['userb64']}/`;
    this.resetPasswordPath= `${this.resetPasswordPath}${this.activatedRoute.snapshot.params['usertoken']}/`;
  }

  private async __sendResetPassword(): Promise<void>{
    try{
      const resetPWResponse: ResetPasswordResponse= await firstValueFrom(this.authUser.resetPasswordHttpPost(
        this.resetPassword(),
        this.resetPasswordPath
      ));
      this.successMessage.set(resetPWResponse.detail);
      await sleepAsync(env.TIME_ERROR_DISPLAY);
      await this.authUser.goTo_login_pageIfNotValidAuthTokenAsync();
    }catch(err:any){
      if( err.error.password ){
        this.passwordWarnings.set(err.error.password);
      }else{ this.passwordWarnings.set([err.error.detail]); }
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.passwordWarnings.set([]);}
      );
    }
  }
  protected async clickedResetPassword(): Promise<void>{
    if( this.resetPassword().password==this.resetPassword().retype_password &&
        this.resetPassword().password!=''){
      await this.__sendResetPassword();
    }else if( this.resetPassword().password=='' ){
      this.passwordWarnings.set(['❌ Please provide your new password ❌']);
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.passwordWarnings.set([]);}
      );
    }else{
      this.passwordWarnings.set(['❌ Password and Retyped password does not match ❌']);
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.passwordWarnings.set([]);}
      );
    }
  }
}
