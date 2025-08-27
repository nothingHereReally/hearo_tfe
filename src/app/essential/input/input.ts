import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class Input {
  readonly nameInput= input<string>('');
  readonly labelText= input<string>('');
  readonly iconNameLeft= input<string>('');
  readonly placeholderText= input<string>('');
  readonly hasEye= input<string>('');
}
