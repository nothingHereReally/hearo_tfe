import {
  AfterViewInit, Component, ElementRef, inject,
  OnDestroy, signal, Signal, viewChild, WritableSignal
} from '@angular/core';
import { Router } from '@angular/router';


import { AuthUser } from '../../api-service/auth-user';
import { Token } from '../../model/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements AfterViewInit, OnDestroy {
  private router= inject(Router);
  private authUser= inject(AuthUser);
  private subcription: Array<Subscription>= [];
  private keepVideoCameraRolling: WritableSignal<boolean>= signal(true);
  protected hasAllowedCamera: WritableSignal<boolean>= signal(false);


  readonly videoElRef: Signal<ElementRef<HTMLVideoElement>>= viewChild.required<ElementRef<HTMLVideoElement>>('videoEl');
  private imgCanvas: Signal<ElementRef<HTMLCanvasElement>>= viewChild.required<ElementRef<HTMLCanvasElement>>('canvasEl');
  private mediaStream?: MediaStream;


  ngAfterViewInit(): void {
    this.initVideoCamera(); /* due to mandatory be asynce */
  }
  ngOnDestroy(): void {
    this.__stopVideoCamera();
    this.subcription.forEach(entry=> entry.unsubscribe());
  }

  private async __sleep(ms: number): Promise<void>{
    return new Promise(resolve=> setTimeout(resolve, ms));
  }

  async initVideoCamera(): Promise<void>{
    try{
      this.hasAllowedCamera.set(true);
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
      /* loop till valid qr or has exited( ie. clicked back ) */
      while( this.keepVideoCameraRolling() ){
        await this.__sleep(1000);
        this.__checkQR_imageForAccessAccount();
      }
    }catch(err){
      /* denied camera access permission by user */
      this.hasAllowedCamera.set(false);
      /* this.initVideoCamera(); does not ask for permission again */
      /* needs refresh to ask again for permission */
    }
  }


  private __checkQR_imageForAccessAccount(): void{
    const context= this.imgCanvas().nativeElement.getContext('2d');
    const width: number= this.videoElRef().nativeElement.videoWidth;
    const height: number= this.videoElRef().nativeElement.videoHeight;
    if( width!=0 && height!=0 ){
      this.imgCanvas().nativeElement.width= this.videoElRef().nativeElement.videoWidth;
      this.imgCanvas().nativeElement.height= this.videoElRef().nativeElement.videoHeight;
      context?.drawImage(this.videoElRef().nativeElement, 0, 0, width, height);
      this.imgCanvas().nativeElement.toBlob((blob)=>{
        this.subcription.push(this.authUser.verifyQR_hearoAccessAccount(blob).subscribe({
          next: (r: any)=>{
            if( r.access!=null && r.access!=null ){
              this.keepVideoCameraRolling.set(false);
              let reponse_token: Token= {
                access: r.access,
                refresh: r.refresh
              };
              /* should save token to cookie */
              this.authUser.saveToken_AccessQRAccount(reponse_token);
              setTimeout(()=>{
                this.router.navigate(['/register']);
              }, 100);
            }
          },
          error: (err: any)=>{
            console.log("error on scanning qr: ", err);
          },
          complete: ()=>{
          }
        }));
      }, 'image/png', 0.98);
    }
  }


  private __stopVideoCamera(): void{
    this.keepVideoCameraRolling.set(false);
    if( this.mediaStream ){
      this.mediaStream.getTracks().forEach(track=>{ track.stop(); });
    }
    this.videoElRef().nativeElement.remove();
  }
  protected backClicked(): void{
    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 100);
  }
}
