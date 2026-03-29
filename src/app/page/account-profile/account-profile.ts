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
  protected toggleEditDone(): void{
    console.log(`toggle edit done ------- ${Math.random()}`);
  }
  protected toggleAccessAccount(): void{
    console.log(`toggle access account ------- ${Math.random()}`);
  }
  protected clickedDELETEAccount(): void{
    console.log(`clicked delete account ------- ${Math.random()}`);
  }
}
