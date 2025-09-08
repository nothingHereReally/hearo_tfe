import { Component, inject, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { Token } from '../../model/token';
import { AuthUser } from '../../api-service/auth-user';
import { RegisterUser } from '../../model/register-user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TIME_ERROR_DISPLAY } from '../../model/constant';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit, OnDestroy{
  protected warning_firstname: WritableSignal<string>= signal('');
  protected warning_lastname: WritableSignal<string>= signal('');
  protected warning_email: WritableSignal<string>= signal('');
  protected warning_username: WritableSignal<string>= signal('');
  protected warning_password: WritableSignal<string>= signal('');
  protected warning_rpassword: WritableSignal<string>= signal('');

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


  private authUser= inject(AuthUser);
  private router= inject(Router);
  private subscription: Array<Subscription>= [];

  ngOnInit(): void {
    this.authTokenQR= this.authUser.getToken_AccessQRAccount()==null? this.authTokenQR: this.authUser.getToken_AccessQRAccount()!;
    this.__checkToken();
  }
  private __checkToken(): void{
    if( this.authTokenQR.access=='' || this.authTokenQR.refresh=='' ){
      this.router.navigate(['/verify-to-register'])
    }
    this.subscription.push(this.authUser.createHearoAccount(this.hearoUser()).subscribe({
      next: (r: any)=>{
      },
      error: (err: any)=>{
        if( ( err.error.email==null && err.error.email==undefined ) &&
          ( err.error.username==null && err.error.username==undefined ) &&
          ( err.error.password==null && err.error.password==undefined ) &&
          ( err.error.first_name==null && err.error.first_name==undefined ) &&
          ( err.error.last_name==null && err.error.last_name==undefined )
        ){
          this.subscription.push(this.authUser.getTokenViaRefresh(this.authTokenQR.refresh).subscribe({
            next: (r: any|Token)=>{
              this.authTokenQR.access= r.access;
              this.authTokenQR.refresh= r.refresh;
              this.authUser.saveToken_AccessQRAccount(this.authTokenQR);
            },
            error: (err: any)=>{
              this.router.navigate(['/verify-to-register']);
            }
          }));
        }
      },
      complete: ()=>{
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(entry=> entry.unsubscribe());
  }


  protected createAccount(): void{
    if( this.hearoUser().first_name!='' && this.hearoUser().last_name!='' &&
    this.hearoUser().email!='' && this.hearoUser().password!='' &&
    this.hearoUser().password==this.hearoUser().retype_password ){


      this.subscription.push(this.authUser.createHearoAccount(this.hearoUser()).subscribe({
        next: (r: any)=>{
          if(r.message=="Hearo user successfully created"){
            this.warning_rpassword.set("Created Account Successfully ✔");
            setTimeout(()=>{
              this.router.navigate(['/login']);
            }, TIME_ERROR_DISPLAY);
          }
        },
        error: (err: any)=>{
          if( ( err.error.email==null && err.error.email==undefined ) &&
            ( err.error.username==null && err.error.username==undefined ) &&
            ( err.error.password==null && err.error.password==undefined ) &&
            ( err.error.first_name==null && err.error.first_name==undefined ) &&
            ( err.error.last_name==null && err.error.last_name==undefined )
          ){
            this.subscription.push(this.authUser.getTokenViaRefresh(this.authTokenQR.refresh).subscribe({
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


          if( err.error.first_name!=undefined ){
            this.warning_firstname.set(String(err.error.first_name[0]));
            setTimeout(()=>{
              this.warning_firstname.set('');
            }, TIME_ERROR_DISPLAY);
          }
          if( err.error.last_name!=undefined ){
            this.warning_lastname.set(String(err.error.last_name[0]));
            setTimeout(()=>{
              this.warning_lastname.set('');
            }, TIME_ERROR_DISPLAY);
          }
          if( err.error.email!=undefined ){
            this.warning_email.set(String(err.error.email[0]));
            setTimeout(()=>{
              this.warning_email.set('');
            }, TIME_ERROR_DISPLAY);
          }
          if( err.error.username!=undefined ){
            this.warning_username.set(String(err.error.username[0]));
            setTimeout(()=>{
              this.warning_username.set('');
            }, TIME_ERROR_DISPLAY);
          }
          if( err.error.password!=undefined ){
            this.warning_password.set(String(err.error.password[0]))
            setTimeout(()=>{
              this.warning_password.set('');
            }, TIME_ERROR_DISPLAY);
          }
        }
      }));
    }else{


      if( this.hearoUser().first_name=='' ){
        this.warning_firstname.set("Please fill your First Name");
        setTimeout(()=>{
          this.warning_firstname.set('');
        }, TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().last_name=='' ){
        this.warning_lastname.set("Please fill your Last Name");
        setTimeout(()=>{
          this.warning_lastname.set('');
        }, TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().email=='' ){
        this.warning_email.set("Please fill your Email");
        setTimeout(()=>{
          this.warning_email.set('');
        }, TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().username=='' ){
        this.warning_username.set("Please fill your desired username");
        setTimeout(()=>{
          this.warning_username.set('');
        }, TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().password=='' ){
        this.warning_password.set("Please create your password");
        setTimeout(()=>{
          this.warning_password.set('');
        }, TIME_ERROR_DISPLAY);
      }
      if( this.hearoUser().retype_password!=this.hearoUser().password ){
        this.warning_rpassword.set("Retyped password doesn't match password");
        setTimeout(()=>{
          this.warning_rpassword.set('');
        }, TIME_ERROR_DISPLAY);
      }


    }

  }
}
