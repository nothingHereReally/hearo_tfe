import { Component, signal, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button implements OnInit{
  readonly text= input<string>('Button Name');
  readonly styleButton= input<string>('style-solid'); /*
  'style-solid', 'style-outline',
  'style-naked', 'style-special',
  'style-link', 'style-danger-solid',
  'style-danger-outline', 'style-danger-naked'
  */
  readonly iconname= input<string>('');
  protected iconfiledir= signal('');
  private iconfile_init: string= '';
  private iconfile_hover: string= '';
  private iconfile_pressed: string= '';


  ngOnInit(){
    let validStyles: Array<string>= [
      'style-solid', 'style-outline',
      'style-naked', 'style-special',
      'style-link', 'style-danger-solid',
      'style-danger-outline', 'style-danger-naked'
    ]
    if(  validStyles.includes(this.styleButton()) ){
      if( this.iconname().length!=0 ){


        if( this.styleButton()===validStyles[0] ){ /* style-solid */
          this.iconfiledir.set(`/icon_sc_900/${this.iconname()}.svg`);
          this.iconfile_init= `/icon_sc_900/${this.iconname()}.svg`;
          this.iconfile_hover= `/icon_sc_900/${this.iconname()}.svg`;
          this.iconfile_pressed= `/icon_sc_900/${this.iconname()}.svg`;
        }else if( this.styleButton()===validStyles[1] ){ /* style-outline */
          this.iconfiledir.set(`/icon_pc1_300/${this.iconname()}.svg`);
          this.iconfile_init= `/icon_pc1_300/${this.iconname()}.svg`
          this.iconfile_hover= `/icon_pc1_300/${this.iconname()}.svg`
          this.iconfile_pressed= `/icon_sc_900/${this.iconname()}.svg`
        }else if( this.styleButton()===validStyles[2] ){ /* style-naked */
          this.iconfiledir.set(`/icon_pc1_300/${this.iconname()}.svg`)
          this.iconfile_init= `/icon_pc1_300/${this.iconname()}.svg`
          this.iconfile_hover= `/icon_pc1_300/${this.iconname()}.svg`
          this.iconfile_pressed= `/icon_pc1_300/${this.iconname()}.svg`
        }else if( this.styleButton()===validStyles[4] ){ /* style-link */
          this.iconfiledir.set(`/icon_tc2_400/link.svg`)
          this.iconfile_init= `/icon_tc2_400/link.svg`
          this.iconfile_hover= `/icon_tc2_400/link.svg`
          this.iconfile_pressed= `/icon_sc_900/link.svg`
        }else if( this.styleButton()===validStyles[5] ){ /* style-danger-solid */
          this.iconfiledir.set(`/icon_sc_900/${this.iconname()}.svg`)
          this.iconfile_init= `/icon_sc_900/${this.iconname()}.svg`
          this.iconfile_hover= `/icon_tc3_500/${this.iconname()}.svg`
          this.iconfile_pressed= `/icon_sc_900/${this.iconname()}.svg`
        }else if( this.styleButton()===validStyles[6] ){ /* style-danger-outline */
          this.iconfiledir.set(`/icon_tc3_500/${this.iconname()}.svg`)
          this.iconfile_init= `/icon_tc3_500/${this.iconname()}.svg`
          this.iconfile_hover= `/icon_tc3_500/${this.iconname()}.svg`
          this.iconfile_pressed= `/icon_sc_900/${this.iconname()}.svg`
        }else if( this.styleButton()===validStyles[7] ){ /* style-danger-naked */
          this.iconfiledir.set(`/icon_tc3_500/${this.iconname()}.svg`)
          this.iconfile_init= `/icon_tc3_500/${this.iconname()}.svg`
          this.iconfile_hover= `/icon_tc3_500/${this.iconname()}.svg`
          this.iconfile_pressed= `/icon_sc_900/${this.iconname()}.svg`
        }


      }
    }else{
      throw new TypeError(`validstyles can only be 1 of the following: ${validStyles}`)
    }
  }


  public onHover(){ /* 1) onHover; 3) onHover */
    this.iconfiledir.set(this.iconfile_hover)
  }
  public onPressing(){ /* 2) onPressing */
    this.iconfiledir.set(this.iconfile_pressed)
  }
  public onClick(){ /* 4) onClick */
    this.iconfiledir.set(this.iconfile_pressed)
    this.onHover()
  }
  public initIcon(){ /* 5) initIcon, leaving hover( outside button ) */
    this.iconfiledir.set(this.iconfile_init)
  }
}
