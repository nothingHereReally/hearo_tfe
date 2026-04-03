import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { DiffUserInfo, HearoTeamDataStruct, RegisterUserWarnings } from '../../model/account';
import { Router } from '@angular/router';


import { firstValueFrom } from 'rxjs';


import { AuthUser } from '../../api-service/auth-user';
import { ApiFile } from '../../api-service/api-file';
import { environment as env } from '../../../environment/environment';
import { allAreSpace, hasSpace, sleepAsync } from '../../model/tools';


@Component({
  selector: 'app-account-profile',
  standalone: false,
  templateUrl: './account-profile.html',
  styleUrl: './account-profile.css'
})
export class AccountProfile implements OnInit{
  private router: Router= inject(Router);
  protected authUser: AuthUser= inject(AuthUser);
  protected apiFile: ApiFile= inject(ApiFile);
  private readonly prevPath: Signal<string>= signal(String(
    this.router.currentNavigation()?.extras.state?.['past_path'] ?? '/home/sentence'
  ));


  protected pastUserHT: WritableSignal<HearoTeamDataStruct>= signal({
    email_verified: null,
    is_access_account: null,
    last_update: null,
    profile_picture: null,
    user: {
        id: null,
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password_last_modified: null,
        date_joined: null,
        last_login: null,
    }
  })
  protected userHT: WritableSignal<HearoTeamDataStruct>= signal({
    email_verified: null,
    is_access_account: null,
    last_update: null,
    profile_picture: null,
    user: {
        id: null,
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password_last_modified: null,
        date_joined: null,
        last_login: null,
    }
  })
  protected userHTWarnings: WritableSignal<RegisterUserWarnings>= signal({
    first_name: [],
    last_name: [],
    email: [],
    username: [],
    password: [],
    retype_password: [],
  });
  protected userHTUpdateSuccess: WritableSignal<RegisterUserWarnings>= signal({
    first_name: [],
    last_name: [],
    email: [],
    username: [],
    password: [],
    retype_password: [],
  });
  protected readonly profileReadOrAndEdit: Signal<Array<string>>= signal(['is-readonly', 'is-not-readonly']);
  protected readOrWithEdit: WritableSignal<string>= signal(this.profileReadOrAndEdit()[0]);


  protected deleteAccountWritePassword: WritableSignal<string>= signal('');
  protected deleteAccountPWWarning: WritableSignal<string>= signal('');
  protected deleteAccountShowSucessMsg: WritableSignal<boolean>= signal(false);
  protected deleteAccount1stGatePass: WritableSignal<boolean>= signal(false);
  protected deleteAccount2ndGatePass: WritableSignal<boolean>= signal(false);


  /**
   * clickedBack()
   * default bo back to /home/sentence
   * to update to pass past data, else use to /home/sentence
   */
  protected clickedBack(): void{
    this.router.navigate([this.prevPath()]);
  }
  protected clickedUploadPhoto(): void{
    const input= document.createElement('input');
    input.type= 'file';
    input.accept= 'image/*';
    input.onchange= async (event: any)=> {
      const imgFile: File= event.target.files[0];
      if(imgFile){
        await firstValueFrom(this.apiFile.uploadPhotoUserHttpPatch(imgFile));
        this.apiFile.updateProfilePhotoAsync();
      }
    };
    input.click();
  }




  ngOnInit(): void {
    this.authUser.updateHearoUserOnCacheAsync()
        .then(()=>{
          this.userHT.set({
            user: {
              first_name: String(this.authUser.cachedHearoUser().user?.first_name),
              last_name: String(this.authUser.cachedHearoUser().user?.last_name),
              email: String(this.authUser.cachedHearoUser().user?.email),
              username: String(this.authUser.cachedHearoUser().user?.username),
            }
          });
          this.pastUserHT.set({
            user: {
              first_name: String(this.authUser.cachedHearoUser().user?.first_name),
              last_name: String(this.authUser.cachedHearoUser().user?.last_name),
              email: String(this.authUser.cachedHearoUser().user?.email),
              username: String(this.authUser.cachedHearoUser().user?.username),
            }
          });
        });
    this.apiFile.updateProfilePhotoAsync();
  }




  protected clickedEdit(): void{
    this.readOrWithEdit.set( this.profileReadOrAndEdit()[1] );
  }
  private __clearAllWarnings(): void{
    this.userHTWarnings.set({
      first_name: [],
      last_name: [],
      email: [],
      username: [],
      password: [],
      retype_password: []
    });
  }
  protected clickedCancelEdit(): void{
    this.readOrWithEdit.set( this.profileReadOrAndEdit()[0] );
    this.userHT.update(currentValue=>({
      ...currentValue,
      user: {
        ...currentValue.user,
        first_name: String(this.pastUserHT().user?.first_name),
        last_name: String(this.pastUserHT().user?.last_name),
        email: String(this.pastUserHT().user?.email),
        username: String(this.pastUserHT().user?.username)
      }
    }));
    this.__clearAllWarnings();
  }
  private __allAreFilledWithRightChars(): boolean{
    let allBeFilled: boolean= true;

    if( this.userHT().user?.first_name=='' ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        first_name: [`First Name can't be Emtpy`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              first_name: []
            }));}
      )
    }else if( allAreSpace(this.userHT().user?.first_name!) ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        first_name: [`First Name can't be All Spaces`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              first_name: []
            }));}
      )
    }
    if( this.userHT().user?.last_name=='' ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        last_name: [`Last Name can't be Emtpy`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              last_name: []
            }));}
      )
    }else if( allAreSpace(this.userHT().user?.last_name!) ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        last_name: [`Last Name can't be All Spaces`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              last_name: []
            }));}
      )
    }
    if( this.userHT().user?.email=='' ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        email: [`Email can't be Emtpy`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              email: []
            }));}
      )
    }else if( hasSpace(this.userHT().user?.email!) ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        email: [`Email can't have Spaces`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              email: []
            }));}
      )
    }
    if( this.userHT().user?.username=='' ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        username: [`Username can't be Emtpy`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              username: []
            }));}
      )
    }else if( hasSpace(this.userHT().user?.username!) ){
      allBeFilled= false;
      this.userHTWarnings.update(currentValue=>({
        ...currentValue,
        username: [`Username can't have Spaces`]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{this.userHTWarnings.update(currentValue=>({
              ...currentValue,
              username: []
            }));}
      )
    }

    return allBeFilled;
  }
  private __diffPastCurrent(): DiffUserInfo{
    let isDifferent: DiffUserInfo= {
      first_name: false,
      last_name: false,
      email: false,
      username: false
    };
    if( this.pastUserHT().user?.first_name!=this.userHT().user?.first_name ){
      isDifferent.first_name= true;
    }
    if( this.pastUserHT().user?.last_name!=this.userHT().user?.last_name ){
      isDifferent.last_name= true;
    }
    if( this.pastUserHT().user?.email!=this.userHT().user?.email ){
      isDifferent.email= true;
    }
    if( this.pastUserHT().user?.username!=this.userHT().user?.username ){
      isDifferent.username= true;
    }
    return isDifferent;
  }
  private __hasChangeAtLeastOne(): boolean{
    const hasDiff: DiffUserInfo= this.__diffPastCurrent();
    if( hasDiff.first_name ){
      return true;
    }else if( hasDiff.last_name ){
      return true;
    }else if( hasDiff.email ){
      return true;
    }else if( hasDiff.username ){
      return true;
    }

    this.userHTWarnings.update(value=>({
      ...value,
      username: ['No Changes has been made.']
    }));
    sleepAsync(
      env.TIME_ERROR_DISPLAY,
      ()=>{
        this.userHTWarnings.update(value=>({
          ...value,
          username: []
        }));
      }
    );

    return false;
  }
  private __updateSuccessMessage(whichHasUpdate: DiffUserInfo): void{
    if( whichHasUpdate.first_name ){
      this.userHTUpdateSuccess.update(value=>({
        ...value,
        first_name: ['Successfully updated First Name ✔']
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTUpdateSuccess.update(value=>({
            ...value,
            first_name: []
          }));
        }
      );
    }
    if( whichHasUpdate.last_name ){
      this.userHTUpdateSuccess.update(value=>({
        ...value,
        last_name: ['Successfully updated Last Name ✔']
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTUpdateSuccess.update(value=>({
            ...value,
            last_name: []
          }));
        }
      );
    }
    if( whichHasUpdate.email ){
      this.userHTUpdateSuccess.update(value=>({
        ...value,
        email: ['Successfully updated Email ✔']
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTUpdateSuccess.update(value=>({
            ...value,
            email: []
          }));
        }
      );
    }
    if( whichHasUpdate.username ){
      this.userHTUpdateSuccess.update(value=>({
        ...value,
        username: ['Successfully updated Username ✔']
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTUpdateSuccess.update(value=>({
            ...value,
            username: []
          }));
        }
      );
    }
  }
  private __showUpdateValidationError(userWarn: RegisterUserWarnings): void{
    if( userWarn.first_name && 0<userWarn.first_name.length ){
      this.userHTWarnings.update(value=>({
        ...value,
        first_name: [...value.first_name, ...userWarn.first_name]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTWarnings.update(value=>({
            ...value,
            first_name: []
          }));
        }
      );
    }
    if( userWarn.last_name && 0<userWarn.last_name.length ){
      this.userHTWarnings.update(value=>({
        ...value,
        last_name: [...value.last_name, ...userWarn.last_name]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTWarnings.update(value=>({
            ...value,
            last_name: []
          }));
        }
      );
    }
    if( userWarn.email && 0<userWarn.email.length ){
      this.userHTWarnings.update(value=>({
        ...value,
        email: [...value.email, ...userWarn.email]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTWarnings.update(value=>({
            ...value,
            email: []
          }));
        }
      );
    }
    if( userWarn.username && 0<userWarn.username.length ){
      this.userHTWarnings.update(value=>({
        ...value,
        username: [...value.username, ...userWarn.username]
      }));
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.userHTWarnings.update(value=>({
            ...value,
            username: []
          }));
        }
      );
    }
  }
  private async __updateInfoViaHttpPatch(): Promise<boolean>{
    const whichHasUpdate: DiffUserInfo= this.__diffPastCurrent();
    try{
      const updateResponse: HearoTeamDataStruct= await this.authUser.updateHearoTeamAccount4BasicInfoAsync(
        this.userHT(),
        whichHasUpdate
      );
      this.__updateSuccessMessage(whichHasUpdate);
      this.authUser.cachedHearoUser.set(structuredClone<HearoTeamDataStruct>(updateResponse));
      this.pastUserHT.set(structuredClone<HearoTeamDataStruct>(updateResponse));
      this.userHT.set(structuredClone<HearoTeamDataStruct>(updateResponse));

      return true;
    }catch(err: any){
      this.__showUpdateValidationError(err.error.user as RegisterUserWarnings);
    }

    return false;
  }
  protected async clickedUpdateInfo(): Promise<void>{
    if( this.readOrWithEdit()==this.profileReadOrAndEdit()[1] &&
        this.__allAreFilledWithRightChars() &&
        this.__hasChangeAtLeastOne() ){

      if( await this.__updateInfoViaHttpPatch() ){
        this.__clearAllWarnings();
        this.readOrWithEdit.set( this.profileReadOrAndEdit()[0] );
      }

    }
  }




  protected async toggleAccessAccount(): Promise<void>{
    if( (this.authUser.cachedHearoUser().is_access_account ?? false)==false ){
      this.authUser.cachedHearoUser.set(
        await firstValueFrom(this.authUser.updateHearoAccountHttpPatch({is_access_account: true}))
      )
    }else{
      this.authUser.cachedHearoUser.set(
        await firstValueFrom(this.authUser.updateHearoAccountHttpPatch({is_access_account: false}))
      );
    }
  }
  protected gotoGenerateAccessQR(): void{
    this.router.navigate(['/account-profile/qr-access-account']);
  }




  protected clickedCancelDELETEAccount(): void{
    this.deleteAccount1stGatePass.set(false);
    this.deleteAccount2ndGatePass.set(false);
    this.deleteAccountWritePassword.set('');
    this.deleteAccountPWWarning.set('');
  }
  private async __checkPasswordOnDeleteAccountAsync(): Promise<boolean>{
    if( this.deleteAccountWritePassword()=='' ){
      this.deleteAccountPWWarning.set('Please put your Password');
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.deleteAccountPWWarning.set('');
        }
      )
      return false;
    }


    try{
      await firstValueFrom(this.authUser.userLoginHttpPost({
        username: String(this.pastUserHT().user?.username),
        password: this.deleteAccountWritePassword()
      }));
    }catch(err: any){
      this.deleteAccountPWWarning.set(String(err.error.details))
      sleepAsync(
        env.TIME_ERROR_DISPLAY,
        ()=>{
          this.deleteAccountPWWarning.set('');
        }
      )
      return false;
    }


    return true;
  }
  protected async clickedDELETEAccount(): Promise<void>{
    if( this.deleteAccount1stGatePass()==false ){
      this.deleteAccount1stGatePass.set(true);

    }else if( this.deleteAccount2ndGatePass()==false ){
      this.deleteAccount2ndGatePass.set(true);

    }else if( this.deleteAccount1stGatePass() &&
              this.deleteAccount2ndGatePass() &&
              await this.__checkPasswordOnDeleteAccountAsync() ){
      await firstValueFrom(this.authUser.deleteHearoTeamHttpDelete());
      this.deleteAccountShowSucessMsg.set(true);
      this.authUser.deleteAccountToken();
      await sleepAsync(env.TIME_ERROR_DISPLAY/2.0);

      this.apiFile.cachedProfilePhotoGoBack2Default();
      this.authUser.cachedHearoUserGoBack2Default();
      this.router.navigate(['/login']);
    }
  }
}
