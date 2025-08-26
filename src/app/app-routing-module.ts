import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// import { Button } from './essential/button/button';

const routes: Routes = [
  // {path: 'button', component: Button},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
