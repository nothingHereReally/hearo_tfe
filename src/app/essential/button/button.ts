import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  readonly text= input<string>('Button Name');
}
