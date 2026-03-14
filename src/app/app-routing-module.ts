import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ForgotPassword } from './src/app/page/forgot-password/forgot-password';
import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login, title: 'Hearo Team Login'},

  {path: 'verify-to-register', component: VerifyToRegister, title: 'Verify Authority | Hearo Team'},
  {path: 'register', component: Register, title: 'Create Account | Hearo Team'},

  {path: 'forgot-password', component: ForgotPassword, title: 'Forgot Password | Hearo Team'},

  {path: 'home', component: Home, title: 'Hearo Home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
