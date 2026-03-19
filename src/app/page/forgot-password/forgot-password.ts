import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


import { AuthUser } from '../../api-service/auth-user';
import { environment as env } from '../../../environment/environment';
import { sleepAsync } from '../../model/tools';
import { ForgotPasswordField, ForgotPasswordResponse } from '../../model/account';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword implements OnInit{
  protected userEmail: WritableSignal<ForgotPasswordField>= signal({
    email: ''
  });
  protected warningEmail: WritableSignal<string>= signal('');
  protected successEmail: WritableSignal<string>= signal('');
  private authUser: AuthUser= inject(AuthUser);


  ngOnInit(): void {
    this.authUser.goTo_home_pageIfValidAuthTokenAsync();
  }


  private async __requestResetPasswordSend2email(): Promise<void>{
      try{
        const reponse: ForgotPasswordResponse= await firstValueFrom(this.authUser.forgotPasswordHttpPost(this.userEmail()));
        this.successEmail.set(reponse.detail);
        sleepAsync(
          env.TIME_ERROR_DISPLAY/3.0,
          ()=>{
            this.successEmail.set('');
            this.authUser.goTo_login_pageIfNotValidAuthTokenAsync();
          }
        );
      }catch(err:any){
        this.warningEmail.set(err.error.detail)
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{
            this.warningEmail.set('');
          }
        );
      }
  }
  protected async getResetLinkClicked(): Promise<void>{
    if(this.userEmail().email!=''){
      await this.__requestResetPasswordSend2email();
    }else{
      this.warningEmail.set('❌Please provide a correct Email. ❌');
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.warningEmail.set('');
        }
      );
    }
  }
}
