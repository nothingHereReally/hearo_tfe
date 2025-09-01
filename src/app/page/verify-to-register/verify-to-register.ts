import { AfterViewInit, Component, ElementRef, Signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements AfterViewInit {
  readonly videoElRef: Signal<ElementRef<HTMLVideoElement>>= viewChild.required<ElementRef<HTMLVideoElement>>('videoEl');
  private imgCanvas: Signal<ElementRef<HTMLCanvasElement>>= viewChild.required<ElementRef<HTMLCanvasElement>>('canvasEl');

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { min: 400, ideal: 700},
        height: { min: 400, ideal: 700},
        facingMode: 'user',
        frameRate: { ideal: 24, max: 30}
      },
      audio: false
    }).then(stream => {
      this.videoElRef().nativeElement.srcObject= stream;
      this.videoElRef().nativeElement.onloadedmetadata= ()=>{
          this.videoElRef().nativeElement.play();
      }
      setTimeout(()=>{
        this.putImage2canvas();
      }, 3000);
    }).catch(error => {
      console.error('Error accessing media devices.', error);
    });
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
}
