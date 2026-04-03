import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AccountProfile } from './page/account-profile/account-profile';
import { ForgotPassword } from './page/forgot-password/forgot-password';
import { HomeGloss } from './page/home-gloss/home-gloss';
import { HomeSentence } from './page/home-sentence/home-sentence';
import { HomeUsage } from './page/home-usage/home-usage';
import { HospitalHead } from './page/hospital-head/hospital-head';
import { Hospitals } from './page/hospitals/hospitals';
import { Login } from './page/login/login';
import { ModelAslRecognition } from './page/model-asl-recognition/model-asl-recognition';
import { ModelGloss } from './page/model-gloss/model-gloss';
import { ModelPatientVideo } from './page/model-patient-video/model-patient-video';
import { Register } from './page/register/register';
import { ResetPassword } from './page/reset-password/reset-password';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';
import { AccountProfileQrAccessAccount } from './page/account-profile-qr-access-account/account-profile-qr-access-account';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login, title: 'Hearo Team Login'},

  {path: 'verify-to-register', component: VerifyToRegister, title: 'Verify Authority | Hearo Team'},
  {path: 'register', component: Register, title: 'Create Account | Hearo Team'},

  {path: 'forgot-password', component: ForgotPassword, title: 'Forgot Password | Hearo Team'},
  {path: 'reset-password/:userb64/:usertoken', component: ResetPassword, title: 'Reset Password | Hearo Team'},

  {path: 'home', redirectTo: 'home/sentence', pathMatch: 'full'},
  {path: 'home/sentence', component: HomeSentence, title: 'Hearo Home'},
  {path: 'home/gloss', component: HomeGloss, title: 'Hearo Home - gloss'},
  {path: 'home/usage', component: HomeUsage, title: 'Hearo Home - usage'},

  {path: 'hospital-head', component: HospitalHead, title: 'Hearo Hospital Heads'},

  {path: 'hospitals', component: Hospitals, title: 'Hearo Hospitals'},

  {path: 'model/patient-video', component: ModelPatientVideo, title: 'Hearo Model - Patient Video'},
  {path: 'model/gloss', component: ModelGloss, title: 'Hearo Model - Gloss Record'},
  {path: 'model/asl-recognition', component: ModelAslRecognition, title: 'Hearo - ASL Model'},

  {path: 'account-profile', component: AccountProfile, title: 'Account Hearo Team'},
  {path: 'account-profile/qr-access-account', component: AccountProfileQrAccessAccount, title: 'Account Hearo - QR'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
