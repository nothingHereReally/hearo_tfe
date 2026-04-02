import {
  AfterViewInit, Component, ElementRef, inject,
  OnDestroy, signal, Signal, viewChild, WritableSignal
} from '@angular/core';
import { Router } from '@angular/router';


// import { firstValueFrom, Subscription } from 'rxjs';
import { firstValueFrom } from 'rxjs';


import { AuthUser } from '../../api-service/auth-user';
import { environment as env } from '../../../environment/environment';
import { Token } from '../../model/token';
import { sleepAsync } from '../../model/tools';


@Component({
  selector: 'app-verify-to-register',
  standalone: false,
  templateUrl: './verify-to-register.html',
  styleUrl: './verify-to-register.css'
})
export class VerifyToRegister implements AfterViewInit, OnDestroy {
  private router: Router= inject(Router);
  private authUser: AuthUser= inject(AuthUser);


  // private subcriptionVerifyQRViaHttpPostRequest: Array<Subscription>= [];
  private keepVideoCameraRolling: WritableSignal<boolean>= signal(true);
  protected hasAllowedCamera: WritableSignal<boolean>= signal(false);


  readonly videoElRef: Signal<ElementRef<HTMLVideoElement>>= viewChild.required<ElementRef<HTMLVideoElement>>('videoEl');
  private imgCanvas: Signal<ElementRef<HTMLCanvasElement>>= viewChild.required<ElementRef<HTMLCanvasElement>>('canvasEl');
  private mediaStream?: MediaStream;


  ngAfterViewInit(): void {
    this.__verifyAuthTokenThenAskForCameraPermissionAsync();
  }
  ngOnDestroy(): void {
    if( this.hasAllowedCamera() ){
      this.__stopVideoCamera();
      // this.subcriptionVerifyQRViaHttpPostRequest.forEach(entry=> entry.unsubscribe());
    }
  }




  private async __verifyAuthTokenThenAskForCameraPermissionAsync(): Promise<void>{
    if(await this.authUser.goTo_home_pageIfValidAuthTokenAsync()===false &&
       await this.authUser.goTo_register_pageIfValidQRTokenAsync()===false){
      await this.__initVideoCameraAsync();
    }
  }
  private async __initVideoCameraAsync(): Promise<void>{
    try{
      this.hasAllowedCamera.set(true);
      /* prompts user for camera access */
      /* if not given permission be error */
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
      while( this.keepVideoCameraRolling() && this.hasAllowedCamera() ){
        await sleepAsync(env.TIME_DELAY_QR_AUTH);
        await this.__checkQR_imageForAccessAccountAsync();
      }
    }catch(err){
      /* denied camera access permission by user */
      this.hasAllowedCamera.set(false);
      /* this.__initVideoCameraAsync(); does not ask for permission again */
      /* needs refresh to ask again for permission */
    }
  }




  private async __checkQR_imageForAccessAccountAsync(): Promise<void>{
    const context= this.imgCanvas().nativeElement.getContext('2d');
    const width: number= this.videoElRef().nativeElement.videoWidth;
    const height: number= this.videoElRef().nativeElement.videoHeight;
    if( width!=0 && height!=0 ){
      this.imgCanvas().nativeElement.width= this.videoElRef().nativeElement.videoWidth;
      this.imgCanvas().nativeElement.height= this.videoElRef().nativeElement.videoHeight;
      context?.drawImage(this.videoElRef().nativeElement, 0, 0, width, height);


      const imageBlob= await new Promise<Blob|null>(resolve =>
        this.imgCanvas().nativeElement.toBlob(resolve, 'image/png', 0.98)
      );
      /* if (!imageBlob) return; no need to check due to logic on __initVideoCameraAsync */
      try {
        const responseAuthToken: Token= await firstValueFrom(this.authUser.verifyQRHearoAccessAccountHttpPost(imageBlob));
        if(responseAuthToken.access && responseAuthToken.refresh){
          this.keepVideoCameraRolling.set(false);
          this.authUser.saveTokenAccessQRAccount(responseAuthToken);
          await sleepAsync(100);
          this.router.navigate(['/register']);
        }
      } catch (err) {
      }
    }
  }




  private __stopVideoCamera(): void{
    this.keepVideoCameraRolling.set(false);
    if( this.mediaStream ){
      this.mediaStream.getTracks().forEach(track=>{ track.stop(); });
    }
    this.videoElRef().nativeElement.remove();
  }




  protected async backClicked(): Promise<void>{
    await sleepAsync(100);
    this.router.navigate(['/login']);
  }
}
