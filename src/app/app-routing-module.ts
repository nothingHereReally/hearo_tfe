import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Home } from './page/home/home';
import { Login } from './page/login/login';

const routes: Routes = [
  {path: 'home', component: Home, title: 'Hearo Home'},
  {path: 'login', component: Login, title: 'Hearo Team Login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
