import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


import { AuthUser } from '../../api-service/auth-user';
import { environment as env } from '../../../environment/environment';
import { isEmailFormat, sleepAsync } from '../../model/tools';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword implements OnInit{
  protected userEmail: WritableSignal<string>= signal('');
  protected warningEmail: WritableSignal<string>= signal('');
  protected successEmail: WritableSignal<string>= signal('');
  private authUser: AuthUser= inject(AuthUser);


  ngOnInit(): void {
    this.authUser.goTo_home_pageIfValidAuthTokenAsync();
  }


  protected getResetLinkClicked(): void{
    if(isEmailFormat(this.userEmail())){
      this.successEmail.set('Reset Link sent to Email. ✔')
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.successEmail.set('');
          this.authUser.goTo_login_pageIfNotValidAuthTokenAsync();
        }
      );
    }else{
      this.warningEmail.set('❌Please provide a correct Email. ❌')
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.warningEmail.set('');
        }
      );
    }
  }
}
