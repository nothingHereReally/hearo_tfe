import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';


import { AuthUser } from '../../api-service/auth-user';
import { ApiFile } from '../../api-service/api-file';
import { SafeUrl } from '@angular/platform-browser';
import { HearoTeamGetWithIdResponse } from '../../model/account';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private authUser: AuthUser= inject(AuthUser);
  private apiFile: ApiFile= inject(ApiFile);
  private router: Router= inject(Router);

  /*
   * uppwerHeaderWhat:
   *  -- /home
   *  -- /hospital-head
   *  -- /hospitals
   *  -- /model
   *
   *
   *
   *
   * lowerHeaderWhat:
   *  -- /home/sentence
   *  -- /home/gloss
   *  -- /home/usage
   *
   *  -- /model/patient-video
   *  -- /model/gloss
   *  -- /model/asl-recognition
   */
  /* TODO
   * ( ✔ solved )use Local Storage for hearoTeamUser
   * ( ✔ solved )for it to not look glitchy
  */
  protected hearoTeamUser: WritableSignal<HearoTeamGetWithIdResponse|null>= signal(null);
  protected lowerHeaderButton: WritableSignal<Array<string>>= signal(['', '', '']);
  protected lowerHeaderStyle: WritableSignal<Array<string>>= signal(['style-outline', 'style-outline', 'style-outline']);

  protected profilePictureSafeUrl: WritableSignal<SafeUrl>= signal('/user_default_profile.svg');

  protected homeStyle: WritableSignal<string>= signal<string>('style-outline');
  protected hospitalHeadStyle: WritableSignal<string>= signal<string>('style-outline');
  protected hospitalsStyle: WritableSignal<string>= signal<string>('style-outline');
  protected modelStyle: WritableSignal<string>= signal<string>('style-outline');


  protected upperHeaderWhat(): string{
    let out: string= this.router.url.split('/').slice(1)[0];
    if( out=='home' || out=='hospital-head' || out=='hospitals' || out=='model' ){
      return out;
    }
    return '';
  }
  private __isHomePage_usedBy_lowerHeaderWhat(lowerWhat: string): boolean{
    return this.upperHeaderWhat()=='home' && (lowerWhat=='sentence' ||
      lowerWhat=='gloss' || lowerWhat=='usage');
  }
  private __isModelPage_usedBy_lowerHeaderWhat(lowerWhat: string): boolean{
    return this.upperHeaderWhat()=='model' && (lowerWhat=='patient-video' ||
      lowerWhat=='gloss' || lowerWhat=='asl-recognition');
  }
  protected lowerHeaderWhat(): string{
    let out: string= this.router.url.split('/').slice(1)[1];
    if( this.__isHomePage_usedBy_lowerHeaderWhat(out) || this.__isModelPage_usedBy_lowerHeaderWhat(out) ){
      return out;
    }
    return '';
  }
  private __setUpperHeader(): void{
    let out: string= this.router.url.split('/').slice(1)[0];
    if( out=='home' ){
      this.homeStyle.set('style-solid');

    }else if( out=='hospital-head' ){
      this.hospitalHeadStyle.set('style-solid');

    }else if( out=='hospitals' ){
      this.hospitalsStyle.set('style-solid');

    }else if( out=='model' ){
      this.modelStyle.set('style-solid');
    }
  }
  private __setLowerHeader(): void{
    if( this.upperHeaderWhat()=='home' ){
      this.lowerHeaderButton.set(['Sentence', 'Gloss', 'Usage']);
    }else if( this.upperHeaderWhat()=='model' ){
      this.lowerHeaderButton.set(['Patient Video', 'Gloss', 'ASL Recognition']);
    }

    if( this.lowerHeaderWhat()=='sentence' || this.lowerHeaderWhat()=='patient-video' ){
      this.lowerHeaderStyle.set(['style-solid', 'style-outline', 'style-outline']);

    }else if( this.lowerHeaderWhat()=='gloss' ){
      this.lowerHeaderStyle.set(['style-outline', 'style-solid', 'style-outline']);

    }else if( this.lowerHeaderWhat()=='usage' || this.lowerHeaderWhat()=='asl-recognition' ){
      this.lowerHeaderStyle.set(['style-outline', 'style-outline', 'style-solid']);
    }
  }
  private async __setProfilePicture(): Promise<void>{
    try{
      this.profilePictureSafeUrl.set( await this.apiFile.getProfilePictureViaSafeUrl() );

      /* does twice due to on Async is slower */
      this.hearoTeamUser.set( this.authUser.getHearoTeamUserViaLocalStorage() );
      this.authUser.updateHearoTeamUserOnLocalStorageAsync()
          .then((hasUpdate: boolean)=>{
            if(hasUpdate){ this.hearoTeamUser.set( this.authUser.getHearoTeamUserViaLocalStorage() ); }
          });


    }catch(error){}
  }


  ngOnInit(): void {
    this.__setProfilePicture();
    this.__setUpperHeader();
    this.__setLowerHeader();
  }


  public clickHome(): void{
    this.router.navigate(['/home/sentence']);
  }
  public clickHospitalHead(): void{
    this.router.navigate(['/hospital-head']);
  }
  public clickHospitals(): void{
    this.router.navigate(['/hospitals']);
  }
  public clickModel(): void{
    this.router.navigate(['/model/patient-video']);
  }


  public clickLowerHeader_1st_button(): void{
    if( this.upperHeaderWhat()!='home' && this.upperHeaderWhat()!='model' ){
      throw new Error("Incorrect implementation, due to if not '/home' and not '/model' then this should not run");

    }else if( this.upperHeaderWhat()=='home' ){
      this.router.navigate(['/home/sentence']);

    }else if( this.upperHeaderWhat()=='model' ){
      this.router.navigate(['/model/patient-video']);
    }
  }
  public clickLowerHeader_2nd_button(): void{
    if( this.upperHeaderWhat()!='home' && this.upperHeaderWhat()!='model' ){
      throw new Error("Incorrect implementation, due to if not '/home' and not '/model' then this should not run");

    }else{
      this.router.navigate([`/${this.upperHeaderWhat()}/gloss`]);
    }
  }
  public clickLowerHeader_3rd_button(): void{
    if( this.upperHeaderWhat()!='home' && this.upperHeaderWhat()!='model' ){
      throw new Error("Incorrect implementation, due to if not '/home' and not '/model' then this should not run");

    }else if( this.upperHeaderWhat()=='home' ){
      this.router.navigate(['/home/usage']);

    }else if( this.upperHeaderWhat()=='model' ){
      this.router.navigate(['/model/asl-recognition']);
    }
  }




  public async logoutAsync(): Promise<void>{
    await this.authUser.userLogOutAsync();
  }
  public clickedProfile(): void{
    this.router.navigate(['/account-profile']);
  }
}
