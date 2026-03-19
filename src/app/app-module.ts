import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';

import { CookieService } from 'ngx-cookie-service';

/* components */
import { Button } from './essential/button/button';
import { DataTable } from './essential/data-table/data-table';
import { Header } from './essential/header/header';
import { Input } from './essential/input/input';

/* pages */
import { ForgotPassword } from './page/forgot-password/forgot-password';
import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { ResetPassword } from './page/reset-password/reset-password';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';

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
    Register,
    ForgotPassword,
    ResetPassword
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    CookieService
  ],
  bootstrap: [App]
})
export class AppModule { }
