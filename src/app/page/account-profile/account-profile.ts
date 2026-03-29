import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { RegisterUser } from '../../model/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  standalone: false,
  templateUrl: './account-profile.html',
  styleUrl: './account-profile.css'
})
export class AccountProfile {
  private router: Router= inject(Router);
  private readonly prevPath: Signal<string>= signal(String(
    this.router.currentNavigation()?.extras.state?.['past_path'] ?? '/sentence/home'
  ));


  protected userInfoEdit: WritableSignal<RegisterUser>= signal({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    retype_password: ''
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




  protected clickedEdit(): void{
    this.readOrWithEdit.set( this.profileReadOrAndEdit()[1] );
  }
  protected clickedCancelEdit(): void{
    this.readOrWithEdit.set( this.profileReadOrAndEdit()[0] );
  }
  protected clickedUpdateInfo(): void{
    this.readOrWithEdit.set( this.profileReadOrAndEdit()[0] );
    /* TODO
     * do warnings then upate
     */
  }




  protected toggleAccessAccount(): void{
    console.log(`toggle access account ------- ${Math.random()}`);
  }
  protected clickedDELETEAccount(): void{
    console.log(`clicked delete account ------- ${Math.random()}`);
  }
}
