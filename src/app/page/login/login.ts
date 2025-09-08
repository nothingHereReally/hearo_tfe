import { Component, signal, WritableSignal } from '@angular/core';
import { LoginField } from '../../model/login-field';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected hearoUser: WritableSignal<LoginField>= signal({
    username: '',
    password: ''
  });
  protected warnings: WritableSignal<LoginField>= signal({
    username: '',
    password: ''
  });


  protected loggingIn(): void{
    console.log("user: ", this.hearoUser());
  }
}
