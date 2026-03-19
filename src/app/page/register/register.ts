// import { OnDestroy } from '@angular/core';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


import { firstValueFrom } from 'rxjs';


import { environment as env } from '../../../environment/environment';
import { AuthUser } from '../../api-service/auth-user';
import { RegisterUser, RegisterUserWarnings } from '../../model/register-user';
import { sleepAsync } from '../../model/tools';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
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


  private authUser: AuthUser= inject(AuthUser);
  // private subscription: Array<Subscription>= [];

  ngOnInit(): void {
    this.__checkTokenAsync();
  }
  private async __checkTokenAsync(): Promise<void>{
    if(await this.authUser.goTo_verify_to_register_pageIfNotValidQRTokenAsync()==false &&
       await this.authUser.goTo_home_pageIfValidAuthTokenAsync()==false){
    }
  }

  // ngOnDestroy(): void {
  //   this.subscription.forEach(entry=> entry.unsubscribe());
  // }


  private __checkIfAllFilled(): boolean{
    return this.hearoUser().first_name!='' && this.hearoUser().last_name!='' &&
    this.hearoUser().email!='' && this.hearoUser().password!='' &&
    this.hearoUser().password==this.hearoUser().retype_password;
  }
  private async __writeWarnings2fillUp(): Promise<void>{
    const field_keys: Array<string>= ['first_name', 'last_name', 'email', 'username', 'password', 'retype_password'];
    const warning2fillString: RegisterUser= {
      first_name: 'Please fill your First Name',
      last_name: 'Please fill your First Name',
      email: 'Please fill your Email',
      username: 'Please fill your desired username',
      password: 'Please create your password',
      retype_password: "Retyped password doesn't match password",
    }
    for(const a_key of field_keys){
      if(this.hearoUser()[a_key as keyof RegisterUser]==''){
        this.warnings.update(value=>{
          value[a_key as keyof RegisterUserWarnings]= [warning2fillString[a_key as keyof RegisterUser]];
          return value;
        });
        sleepAsync(env.TIME_ERROR_DISPLAY, ()=>{this.warnings.update(value=>{
          value[a_key as keyof RegisterUserWarnings]=[];
          return value;
        })});
      }
    }
    if( this.hearoUser().password!=this.hearoUser().retype_password ){
      this.warnings.update(value=>{
        value.retype_password= [warning2fillString.retype_password];
        return value;
      });
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.warnings.update(value=>{
            value.retype_password= [];
            return value;  })
        }
      );
    }
  }
  private __displayWarningsFromResponse(err:any){
    const field_keys: Array<string>= ['first_name', 'last_name', 'email', 'username', 'password'];
    const warningFromApi: RegisterUserWarnings= {
      first_name: err.error.user.first_name ?? [],
      last_name: err.error.user.last_name ?? [],
      email: err.error.user.email ?? [],
      username: err.error.user.username ?? [],
      password: err.error.user.password ?? [],
      retype_password: [],
    }
    for(const a_key of field_keys){
      if( 0<warningFromApi[a_key as keyof RegisterUserWarnings].length ){
        this.warnings.update(value=>{
          value[a_key as keyof RegisterUserWarnings]= warningFromApi[a_key as keyof RegisterUserWarnings];
          return value;
        });
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{this.warnings.update(value=>{
            value[a_key as keyof RegisterUserWarnings]=[];
            return value;
          })}
        );
      }
    }
  }


  protected async createAccount(): Promise<void>{
    if( this.__checkIfAllFilled() ){
      try{
        await firstValueFrom(this.authUser.createHearoAccountHttpPost(this.hearoUser()));
        this.warnings.update(value=>{ value.retype_password=['Created Account Successfully ✔']; return value;});
        await sleepAsync(env.TIME_ERROR_DISPLAY);
        await this.authUser.qrAccessAccountRemoveAnd_goTo_login_pageAsync();
      }catch(err: any){
        this.__displayWarningsFromResponse(err);
      }
    }else{
      await this.__writeWarnings2fillUp();
    }
  }
}
