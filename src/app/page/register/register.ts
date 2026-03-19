import { Component, inject, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { environment as env } from '../../../environment/environment';
import { Token } from '../../model/token';
import { AuthUser } from '../../api-service/auth-user';
import { RegisterUser, RegisterUserWarnings } from '../../model/register-user';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit, OnDestroy{
  protected warnings: WritableSignal<RegisterUserWarnings>= signal({
    first_name: [],
    last_name: [],
    email: [],
    username: [],
    password: [],
    retype_password: []
  });
  protected hearoUser: WritableSignal<RegisterUser>= signal({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    retype_password: ''
  });


  private authTokenQR: Token= {
    access: '',
    refresh: ''
  };


  private authUser: AuthUser= inject(AuthUser);
  private router: Router= inject(Router);
  private subscription: Array<Subscription>= [];

  ngOnInit(): void {
    this.__checkTokenAsync();
  }
  private async __checkTokenAsync(): Promise<void>{
    if(await this.authUser.goTo_verify_to_register_pageIfNotValidQRTokenAsync()==false &&
       await this.authUser.goTo_home_pageIfValidAuthTokenAsync()==false){
      this.authTokenQR= this.authUser.getToken_AccessQRAccount()!;
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(entry=> entry.unsubscribe());
  }


  private __checkIfAllFilled(): boolean{
    return this.hearoUser().first_name!='' && this.hearoUser().last_name!='' &&
    this.hearoUser().email!='' && this.hearoUser().password!='' &&
    this.hearoUser().password==this.hearoUser().retype_password;
  }
  private __writeWarnings2fillUp(): void{
    if( this.hearoUser().first_name=='' ){
      this.warnings.update(
        value=>{
          value.first_name= [...value.first_name, 'Please fill your First Name'];
          return value;
        }
      );
      setTimeout(()=>{
        this.warnings.update(value=>{ value.first_name=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().last_name=='' ){
      this.warnings.update(
        value=>{
          value.last_name= [...value.last_name, 'Please fill your Last Name'];
          return value;
        }
      );
      setTimeout(()=>{
        this.warnings.update(value=>{ value.last_name=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().email=='' ){
      this.warnings.update(
        value=>{
          value.email= [...value.email, 'Please fill your Email'];
          return value;
        }
      );
      setTimeout(()=>{
        this.warnings.update(value=>{ value.email=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().username=='' ){
      this.warnings.update(
        value=>{
          value.username= [...value.username, 'Please fill your desired username'];
          return value;
        }
      );
      setTimeout(()=>{
        this.warnings.update(value=>{ value.username=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().password=='' ){
      this.warnings.update(
        value=>{
          value.password= [...value.password, 'Please create your password'];
          return value;
        }
      );
      setTimeout(()=>{
        this.warnings.update(value=>{ value.password=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if( this.hearoUser().retype_password!=this.hearoUser().password ){
      this.warnings.update(
        value=>{
          value.retype_password= [...value.retype_password, "Retyped password doesn't match password"];
          return value;
        }
      );
      setTimeout(()=>{
        this.warnings.update(value=>{ value.retype_password=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
  }
  private __displayWarningsFromResponse(err:any){
    if(err.error.user.first_name!=null){
      for(const warn_first_name of err.error.user.first_name){
        this.warnings.update(value=>{
          value.first_name= [...value.first_name, warn_first_name];
          return value;
        });
      }
      setTimeout(()=>{
        this.warnings.update(value=>{ value.first_name=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if(err.error.user.last_name!=null){
      for(const warn_last_name of err.error.user.last_name){
        this.warnings.update(value=>{
          value.last_name= [...value.last_name, warn_last_name];
          return value;
        });
      }
      setTimeout(()=>{
        this.warnings.update(value=>{ value.last_name=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if(err.error.user.email!=null){
      for(const warn_email of err.error.user.email){
        this.warnings.update(value=>{
          value.email= [...value.email, warn_email];
          return value;
        });
      }
      setTimeout(()=>{
        this.warnings.update(value=>{ value.email=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if(err.error.user.username!=null){
      for(const warn_username of err.error.user.username){
        this.warnings.update(value=>{
          value.username= [...value.username, warn_username];
          return value;
        });
      }
      setTimeout(()=>{
        this.warnings.update(value=>{ value.username=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
    if(err.error.user.password!=null){
      for(const warn_password of err.error.user.password){
        this.warnings.update(value=>{
          value.password= [...value.password, warn_password];
          return value;
        });
      }
      setTimeout(()=>{
        this.warnings.update(value=>{ value.password=[]; return value;});
      }, env.TIME_ERROR_DISPLAY);
    }
  }


  protected async createAccount(): Promise<void>{
    if( this.__checkIfAllFilled() ){
      try{
        await firstValueFrom(this.authUser.createHearoAccountHttpPost(this.hearoUser()));
        this.warnings.update(value=>{ value.retype_password=['Created Account Successfully ✔']; return value;});
        setTimeout(()=>{
          this.authUser.qrAccessAccountRemoveAsync();
        }, env.TIME_ERROR_DISPLAY);
      }catch(err: any){
        this.__displayWarningsFromResponse(err);
      }
    }else{
      this.__writeWarnings2fillUp();
    }
  }
}
