import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements OnInit{

  videoRef: any;
  ngOnInit(): void {
    this.videoRef= document.getElementById('videoEl');
    console.log(this.videoRef);
    navigator.mediaDevices.getUserMedia({
      video: {width: 400, height: 400},
      audio: false
    }).then(stram=>{
        console.log(stram);
        this.videoRef.srcObject= stram;
    });
  }
}
