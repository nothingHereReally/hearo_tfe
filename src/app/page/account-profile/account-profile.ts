import { Component, signal, WritableSignal } from '@angular/core';
import { RegisterUser } from '../../model/account';

@Component({
  selector: 'app-account-profile',
  standalone: false,
  templateUrl: './account-profile.html',
  styleUrl: './account-profile.css'
})
export class AccountProfile {
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
    console.log(`go back blah ------- ${Math.random()}`);
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
