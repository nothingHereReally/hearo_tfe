import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  readonly text= input<string>('Button Name');
  readonly styleButton= input<string>('solid'); /* solid, outline, naked, spacial, link,
  danger_solid, danger_outline, danger_naked */
  readonly iconDir= input<string>('blah');
}
