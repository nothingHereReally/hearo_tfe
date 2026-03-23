import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ForgotPassword } from './page/forgot-password/forgot-password';
import { HospitalHead } from './page/hospital-head/hospital-head';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { ResetPassword } from './page/reset-password/reset-password';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';
import { Hospitals } from './page/hospitals/hospitals';
import { ModelGloss } from './page/model-gloss/model-gloss';
import { ModelAslRecognitionModel } from './page/model-asl-recognition-model/model-asl-recognition-model';
import { ModelPatientVideo } from './page/model-patient-video/model-patient-video';
import { HomeUsage } from './page/home-usage/home-usage';
import { HomeGloss } from './page/home-gloss/home-gloss';
import { HomeSentence } from './page/home-sentence/home-sentence';

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
  {path: 'model/asl-recognition-model', component: ModelAslRecognitionModel, title: 'Hearo - ASL Model'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
