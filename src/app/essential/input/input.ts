import { Component, input, signal, OnInit, model, output, InputSignal, OutputEmitterRef, ModelSignal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-input',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input implements OnInit{
  readonly isReadOnly: InputSignal<'is-readonly'|'is-not-readonly'>= input<'is-readonly'|'is-not-readonly'>('is-not-readonly');
  public outWant2Run: OutputEmitterRef<void>= output<void>();

  readonly nameInput: InputSignal<string>= input<string>('');
  readonly labelText: InputSignal<string>= input<string>('');

  readonly iconNameLeft: InputSignal<string>= input<string>('');
  readonly placeholderText: InputSignal<string>= input<string>('');
  public inputValue: ModelSignal<string>= model<string>('');
  readonly hasEye: InputSignal<''|'eye'>= input<''|'eye'>('');
  readonly hasSearch: InputSignal<''|'search'>= input<''|'search'>('');

  protected iconOnRight: WritableSignal<string>= signal<string>('');
  protected textType: WritableSignal<string>= signal<string>('text');

  ngOnInit(): void{
    if( this.hasSearch()=='search' && this.hasEye()=='eye' ){
      throw new TypeError(`hasEye and hasSearch can both exist, not allowed`);
    }
    if( this.hasEye()!='' && this.hasEye()!='eye' ){
      throw new TypeError(`hasEye can only be empty '' or 'eye', due to hasEye is ${this.hasEye()}`);
    }else if( this.hasEye()=='eye' ){
      this.iconOnRight.set('/icon_pc1_300/eye_close.svg');
      this.textType.set('password');
    }else if( this.iconNameLeft()=='email' ){
      this.textType.set('email');
    }
    if( this.hasSearch()=='search' ){
      this.iconOnRight.set('/icon_pc1_300/search.svg');
    }
    if( this.isReadOnly()!='is-readonly' && this.isReadOnly()!='is-not-readonly' ){
      throw new TypeError(`isReadOnly can only be 'is-readonly' or 'is-not-readonly', due to isReadOnly is ${this.isReadOnly()}`);
    }
  }
  public eyeClick(): void{
    if( this.iconOnRight()=='/icon_pc1_300/eye_close.svg' ){
      this.iconOnRight.set('/icon_pc1_300/eye_open.svg');
      this.textType.set('text');
    }else{
      this.iconOnRight.set('/icon_pc1_300/eye_close.svg');
      this.textType.set('password');
    }
  }


  public onEnterClick(): void{
    this.outWant2Run.emit();
  }
}
