import { Component, inject, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { environment as env } from '../../../environment/environment';
import { Token } from '../../model/token';
import { AuthUser } from '../../api-service/auth-user';
import { RegisterUser } from '../../model/register-user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateAccountError } from '../../model/create-account-error';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit, OnDestroy{
  protected warnings: WritableSignal<RegisterUser>= signal({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    retype_password: ''
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
    this.__checkToken();
  }
  private async __checkToken(): Promise<void>{
    await this.authUser.goTo_verify_to_register_pageIfNotValidQRToken();
    this.authTokenQR= this.authUser.getToken_AccessQRAccount()==null? this.authTokenQR: this.authUser.getToken_AccessQRAccount()!;
  }

  ngOnDestroy(): void {
    this.subscription.forEach(entry=> entry.unsubscribe());
  }


  protected createAccount(): void{
    if( this.hearoUser().first_name!='' && this.hearoUser().last_name!='' &&
    this.hearoUser().email!='' && this.hearoUser().password!='' &&
    this.hearoUser().password==this.hearoUser().retype_password ){


      this.subscription.push(this.authUser.createHearoAccountHttpPost(this.hearoUser()).subscribe({
        next: (r: any)=>{
          if(r.message=="Hearo user successfully created"){
            this.warnings.update(value=>{value.retype_password="Created Account Successfully ✔"; return value})
            setTimeout(()=>{
              this.router.navigate(['/login']);
            }, env.TIME_ERROR_DISPLAY/2);
          }
        },
        error: (err: any)=>{
          let msgErrors: CreateAccountError= {
            first_name: err.error.first_name,
            last_name: err.error.last_name,
            email: err.error.email,
            username: err.error.username,
            password: err.error.password,
          };
          if( msgErrors.email==undefined &&
            msgErrors.username==undefined &&
            msgErrors.password==undefined &&
            msgErrors.first_name==undefined &&
            msgErrors.last_name==undefined
          ){
            this.subscription.push(this.authUser.getTokenViaRefreshHttpPost(this.authTokenQR.refresh).subscribe({
              next: (r: any|Token)=>{
                this.authTokenQR.access= r.access;
                this.authTokenQR.refresh= r.refresh;
                this.authUser.saveToken_AccessQRAccount(this.authTokenQR);
                this.createAccount();
              },
              error: (err: any)=>{
                this.router.navigate(['/verify-to-register']);
              }
            }));
          }


          if( msgErrors.first_name!=undefined ){
            this.warnings.update(value=>{ value.first_name=String(msgErrors.first_name![0]); return value });
            setTimeout(()=>{
              this.warnings.update(value=>{ value.first_name=''; return value });
            }, env.TIME_ERROR_DISPLAY);
          }
          if( msgErrors.last_name!=undefined ){
            this.warnings.update(value=>{ value.last_name=String(msgErrors.last_name![0]); return value });
            setTimeout(()=>{
              this.warnings.update(value=>{ value.last_name=''; return value });
            }, env.TIME_ERROR_DISPLAY);
          }
          if( msgErrors.email!=undefined ){
            this.warnings.update(value=>{ value.email=String(msgErrors.email![0]); return value });
            setTimeout(()=>{
              this.warnings.update(value=>{ value.email=''; return value })
            }, env.TIME_ERROR_DISPLAY);
          }
          if( msgErrors.username!=undefined ){
            this.warnings.update(value=>{ value.username=String(msgErrors.username![0]); return value });
            setTimeout(()=>{
              this.warnings.update(value=>{ value.username=''; return value });
            }, env.TIME_ERROR_DISPLAY);
          }
          if( msgErrors.password!=undefined ){
            this.warnings.update(value=>{ value.password=String(msgErrors.password![0]); return value });
            setTimeout(()=>{
              this.warnings.update(value=>{ value.password=''; return value });
            }, env.TIME_ERROR_DISPLAY);
          }
        }
      }));
    }else{


      if( this.hearoUser().first_name=='' ){
        this.warnings.update(value=>{ value.first_name="Please fill your First Name"; return value });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.first_name=""; return value });
        }, env.TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().last_name=='' ){
        this.warnings.update(value=>{ value.last_name="Please fill your Last Name"; return value });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.last_name=""; return value });
        }, env.TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().email=='' ){
        this.warnings.update(value=>{ value.email="Please fill your Email"; return value });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.email=""; return value });
        }, env.TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().username=='' ){
        this.warnings.update(value=>{ value.username="Please fill your desired username"; return value });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.username=""; return value });
        }, env.TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().password=='' ){
        this.warnings.update(value=>{ value.password="Please create your password"; return value });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.password=""; return value });
        }, env.TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().retype_password!=this.hearoUser().password ){
        this.warnings.update(value=>{ value.retype_password="Retyped password doesn't match password"; return value });
        setTimeout(()=>{
          this.warnings.update(value=>{ value.retype_password=""; return value });
        }, env.TIME_ERROR_DISPLAY);
      }


    }

  }
}
