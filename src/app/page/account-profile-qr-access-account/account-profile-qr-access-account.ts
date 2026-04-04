import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


import { AuthUser } from '../../api-service/auth-user';
import { environment as env } from '../../../environment/environment';
import { sleepAsync } from '../../model/tools';
import { ApiFile } from '../../api-service/api-file';


@Component({
  selector: 'app-account-profile-qr-access-account',
  standalone: false,
  templateUrl: './account-profile-qr-access-account.html',
  styleUrl: './account-profile-qr-access-account.css'
})
export class AccountProfileQrAccessAccount implements OnInit, OnDestroy{
  private sanitizer: DomSanitizer= inject(DomSanitizer);

  protected authUser: AuthUser= inject(AuthUser);
  private apiFile: ApiFile= inject(ApiFile);

  protected password2confirm: WritableSignal<string>= signal('');
  protected iunderstand2confirm: WritableSignal<string>= signal('');

  protected passedGate1: WritableSignal<boolean>= signal(false);
  protected passedGate2: WritableSignal<boolean>= signal(false);

  protected warningInputText: WritableSignal<string>= signal('');
  protected qrImageSafeUrl: WritableSignal<SafeUrl>= signal('/user_default_profile.svg');


  ngOnInit(): void{
    this.apiFile.getQRAccessAccountCode()
        .then((imgSafeUrl)=>{ this.qrImageSafeUrl.set(imgSafeUrl); });
  }
  ngOnDestroy(): void {
    URL.revokeObjectURL(`${this.sanitizer.sanitize(4, this.qrImageSafeUrl())}`);
  }


  protected async checkGate1(): Promise<void>{
    const isEmpty= ():boolean=>{
      if( this.password2confirm()=='' ){
        this.warningInputText.set('Please fill will your password');
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{ this.warningInputText.set(''); }
        )
      }
      return this.password2confirm()=='';
    }

    if( this.passedGate1()==false && !isEmpty() ){
      try{
        await firstValueFrom(this.authUser.userLoginHttpPost({
          username: this.authUser.cachedHearoUser().user?.username ?? "",
          password: this.password2confirm()
        }));
        this.passedGate1.set(true);


      }catch(err: any){
        this.warningInputText.set(String(err.error.details));
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{
            this.warningInputText.set('');
          }
        )
      }
    }
  }
  protected checkGate2(): void{
    if( this.passedGate2()==false ){
      if( this.iunderstand2confirm()!="I UNDERSTAND"){
        this.warningInputText.set(`Please type "I UNDERSTAND"`);
        sleepAsync(
          env.TIME_ERROR_DISPLAY,
          ()=>{
            this.warningInputText.set('');
          }
        )
      }else{ this.passedGate2.set(true); }
    }
  }


  protected clickedDownload(): void{
    const link: HTMLAnchorElement= document.createElement('a');
    link.href= `${this.sanitizer.sanitize(4, this.qrImageSafeUrl())}`;
    link.download= `${this.authUser.cachedHearoUser().user?.username ?? "hearo_team_user"}_qr_code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
