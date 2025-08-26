import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  readonly text= input<string>('Button Name');
  readonly styleButton= input<string>('style-solid'); /* style-solid, style-outline, style-naked, style-spacial, style-link,
  style-danger_solid, style-danger_outline, style-danger_naked */
  readonly iconDir= input<string>('blah');
}
