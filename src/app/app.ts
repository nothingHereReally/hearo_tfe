import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title= signal('hearo_tfe');
  protected inputText= signal('some thing blah blah');


  public onClick(){
    console.log(`from app.ts__${Math.random()} input ${this.inputText()}`)
  }
}
