import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';
import { Register } from './page/register/register';

const routes: Routes = [
  {path: 'home', component: Home, title: 'Hearo Home'},
  {path: 'login', component: Login, title: 'Hearo Team Login'},
  {path: 'verify-to-register', component: VerifyToRegister, title: 'Verify Authority'},
  {path: 'register', component: Register, title: 'Create Account'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
