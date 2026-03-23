import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ForgotPassword } from './page/forgot-password/forgot-password';
import { Gloss } from './page/home/gloss/gloss';
import { HospitalHead } from './page/hospital-head/hospital-head';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { ResetPassword } from './page/reset-password/reset-password';
import { Sentence } from './page/home/sentence/sentence';
import { Usage } from './page/home/usage/usage';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';
import { PatientVideo } from './page/model/patient-video/patient-video';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login, title: 'Hearo Team Login'},

  {path: 'verify-to-register', component: VerifyToRegister, title: 'Verify Authority | Hearo Team'},
  {path: 'register', component: Register, title: 'Create Account | Hearo Team'},

  {path: 'forgot-password', component: ForgotPassword, title: 'Forgot Password | Hearo Team'},
  {path: 'reset-password/:userb64/:usertoken', component: ResetPassword, title: 'Reset Password | Hearo Team'},

  {path: 'home', redirectTo: 'home/sentence', pathMatch: 'full'},
  {path: 'home/sentence', component: Sentence, title: 'Hearo Home'},
  {path: 'home/gloss', component: Gloss, title: 'Hearo Home - gloss'},
  {path: 'home/usage', component: Usage, title: 'Hearo Home - usage'},

  {path: 'hospital-head', component: HospitalHead, title: 'Hearo Hospital Heads'},

  {path: 'model/patient-video', component: PatientVideo, title: 'Hearo Model - Patient Video'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
