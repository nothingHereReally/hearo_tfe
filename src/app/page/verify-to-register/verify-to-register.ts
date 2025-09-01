import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements AfterViewInit {
  readonly videoRef = viewChild.required<ElementRef<HTMLVideoElement>>('videoEl');

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      this.videoRef().nativeElement.srcObject= stream;
    }).catch(error => {
      console.error('Error accessing media devices.', error);
    });
  }
}
