import { Component, input, signal, OnInit, model, output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.html',
  styleUrl: './input.css'
})
export class Input implements OnInit{
  readonly isReadOnly= input<string>('is-not-readonly');
  public outWant2Run= output();

  readonly nameInput= input<string>('');
  readonly labelText= input<string>('');

  readonly iconNameLeft= input<string>('');
  readonly placeholderText= input<string>('');
  public inputValue= model<string>('');
  readonly hasEye= input<string>('');

  protected eyefile= signal<string>('');
  protected textType= signal<string>('text');

  ngOnInit(): void{
    if( this.hasEye()!='' && this.hasEye()!='eye' ){
      throw new TypeError(`hasEye can only be empty '' or 'eye', due to hasEye is ${this.hasEye()}`);
    }else if( this.hasEye()=='eye' ){
      this.eyefile.set('/icon_pc1_300/eye_close.svg');
      this.textType.set('password');
    }else if( this.iconNameLeft()=='email' ){
      this.textType.set('email');
    }
    if( this.isReadOnly()!='is-readonly' && this.isReadOnly()!='is-not-readonly' ){
      throw new TypeError(`isReadOnly can only be 'is-readonly' or 'is-not-readonly', due to isReadOnly is ${this.isReadOnly()}`);
    }
  }
  public eyeClick(): void{
    if( this.eyefile()=='/icon_pc1_300/eye_close.svg' ){
      this.eyefile.set('/icon_pc1_300/eye_open.svg');
      this.textType.set('text');
    }else{
      this.eyefile.set('/icon_pc1_300/eye_close.svg');
      this.textType.set('password');
    }
  }


  public onEnterClick(): void{
    this.outWant2Run.emit();
  }
}
