import { AfterViewInit, Component, ElementRef, Signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements AfterViewInit {
  readonly videoRef: Signal<ElementRef<HTMLVideoElement>>= viewChild.required<ElementRef<HTMLVideoElement>>('videoEl');

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
      this.videoRef().nativeElement.srcObject= stream;
      this.videoRef().nativeElement.onloadedmetadata= ()=>{
          this.videoRef().nativeElement.play();
      }
      setTimeout(()=>{
        console.log(this.videoRef().nativeElement);
        console.log(this.videoRef().nativeElement.videoWidth);
        console.log(this.videoRef().nativeElement.videoHeight);
        console.log(this.videoRef().nativeElement.width);
        console.log(this.videoRef().nativeElement.height);
      }, 3000);
    }).catch(error => {
      console.error('Error accessing media devices.', error);
    });
  }
}
