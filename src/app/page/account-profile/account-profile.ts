import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { HearoTeamGetWithIdResponse, RegisterUserWarnings } from '../../model/account';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';


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
  private authUser: AuthUser= inject(AuthUser);
  private apiFile: ApiFile= inject(ApiFile);
  private readonly prevPath: Signal<string>= signal(String(
    this.router.currentNavigation()?.extras.state?.['past_path'] ?? '/home/sentence'
  ));


  protected profilePictureSafeUrl: WritableSignal<SafeUrl>= signal('/user_default_profile.svg');
  protected pastUserHT: WritableSignal<HearoTeamGetWithIdResponse>= signal({
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
  protected userHT: WritableSignal<HearoTeamGetWithIdResponse>= signal({
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
  protected readonly profileReadOrAndEdit: Signal<Array<string>>= signal(['is-readonly', 'is-not-readonly']);
  protected readOrWithEdit: WritableSignal<string>= signal(this.profileReadOrAndEdit()[0]);


  /**
   * clickedBack()
   * default bo back to /home/sentence
   * to update to pass past data, else use to /home/sentence
   */
  protected clickedBack(): void{
    this.router.navigate([this.prevPath()]);
  }
  protected clickedUploadPhoto(): void{
    console.log(`clicked upload photo ------- ${Math.random()}`);
  }




  ngOnInit(): void {
    this.userHT.set( this.authUser.getHearoTeamUserViaLocalStorage()! );
    this.pastUserHT.set( this.authUser.getHearoTeamUserViaLocalStorage()! );
    this.__setProfilePictureAsync();
  }




  private async __setProfilePictureAsync(): Promise<void>{
    const imageBlobUrl: SafeUrl= await this.apiFile.getProfilePictureViaSafeUrlAsync();
    if( imageBlobUrl!=null ){
      this.profilePictureSafeUrl.set( imageBlobUrl );
    }
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
        first_name: String(this.pastUserHT().user.first_name),
        last_name: String(this.pastUserHT().user.last_name),
        email: String(this.pastUserHT().user.email),
        username: String(this.pastUserHT().user.username)
      }
    }));
    this.__clearAllWarnings();
  }
  private __allAreFilledWithRightChars(): boolean{
    let allBeFilled: boolean= true;

    if( this.userHT().user.first_name=='' ){
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
    }else if( allAreSpace(this.userHT().user.first_name!) ){
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
    if( this.userHT().user.last_name=='' ){
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
    }else if( allAreSpace(this.userHT().user.last_name!) ){
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
    if( this.userHT().user.email=='' ){
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
    }else if( hasSpace(this.userHT().user.email!) ){
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
    if( this.userHT().user.username=='' ){
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
    }else if( hasSpace(this.userHT().user.username!) ){
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
  protected clickedUpdateInfo(): void{
    if( this.__allAreFilledWithRightChars() ){
      this.__clearAllWarnings();
      this.readOrWithEdit.set( this.profileReadOrAndEdit()[0] );
      /* TODO
       * do warnings then upate
       */
    }
  }




  protected toggleAccessAccount(): void{
    console.log(`toggle access account ------- ${Math.random()}`);
  }
  protected clickedDELETEAccount(): void{
    console.log(`clicked delete account ------- ${Math.random()}`);
  }
}
