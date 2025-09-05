import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Button } from './essential/button/button';
import { Input } from './essential/input/input';
import { Home } from './page/home/home';
import { DataTable } from './essential/data-table/data-table';
import { Header } from './essential/header/header';
import { Login } from './page/login/login';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Register } from './page/register/register';

@NgModule({
  declarations: [
    App,
    Button,
    Input,
    Home,
    DataTable,
    Header,
    Login,
    VerifyToRegister,
    Register
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    CookieService
  ],
  bootstrap: [App]
})
export class AppModule { }
