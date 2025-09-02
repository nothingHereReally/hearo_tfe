import { AfterViewInit, Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements AfterViewInit {
  private router= inject(Router);


  readonly videoElRef: Signal<ElementRef<HTMLVideoElement>>= viewChild.required<ElementRef<HTMLVideoElement>>('videoEl');
  private imgCanvas: Signal<ElementRef<HTMLCanvasElement>>= viewChild.required<ElementRef<HTMLCanvasElement>>('canvasEl');
  private mediaStream?: MediaStream;

  ngAfterViewInit() {
    this.initVideoCamera(); /* due to mandatory be asynce */
  }

  async initVideoCamera(): Promise<void>{
    try{
      this.mediaStream= await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 400, ideal: 700},
          height: { min: 400, ideal: 700},
          facingMode: 'user',
          frameRate: { ideal: 24, max: 30}
        },
        audio: false
      });
      this.videoElRef().nativeElement.srcObject= this.mediaStream;
      this.videoElRef().nativeElement.onloadedmetadata= ()=>{
          this.videoElRef().nativeElement.play();
      }
      // setTimeout(()=>{
      //   this.putImage2canvas();
      // }, 3000);
    }catch(err){
      console.log(`error occured on getting video ${err}`);
    }
  }


  private putImage2canvas(): void{
    const context= this.imgCanvas().nativeElement.getContext('2d');
    const width: number= this.videoElRef().nativeElement.videoWidth;
    const height: number= this.videoElRef().nativeElement.videoHeight;
    if( width!=0 && height!=0 ){
      this.imgCanvas().nativeElement.width= this.videoElRef().nativeElement.videoWidth
      this.imgCanvas().nativeElement.height= this.videoElRef().nativeElement.videoHeight
      context?.drawImage(this.videoElRef().nativeElement, 0, 0, width, height);
      const imgURL= this.imgCanvas().nativeElement.toDataURL('image/png');
      console.log(`image url save at: ${imgURL}`);
    }
  }


  protected backClicked(): void{
    if( this.mediaStream ){
      this.mediaStream.getTracks().forEach(track=>{ track.stop(); });
    }

    this.videoElRef().nativeElement.remove()
    this.router.navigate(['/login']);
  }
}
