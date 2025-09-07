import { Component, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  protected warning_firstname: WritableSignal<string>= signal('warning first name');
  protected warning_lastname: WritableSignal<string>= signal('warning last name');
  protected warning_email: WritableSignal<string>= signal('warning email');
  protected warning_password: WritableSignal<string>= signal('warning password');
  protected warning_rpassword: WritableSignal<string>= signal('warning retype password');

  ngOnInit(): void {
      console.log("hello world: ", Math.random());
  }
}
