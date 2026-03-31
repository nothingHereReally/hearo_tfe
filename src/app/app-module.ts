import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
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
import { HospitalHead } from './page/hospital-head/hospital-head';
import { Login } from './page/login/login';
import { Register } from './page/register/register';
import { ResetPassword } from './page/reset-password/reset-password';
import { VerifyToRegister } from './page/verify-to-register/verify-to-register';
import { Hospitals } from './page/hospitals/hospitals';
import { ModelGloss } from './page/model-gloss/model-gloss';
import { ModelAslRecognition } from './page/model-asl-recognition/model-asl-recognition';
import { ModelPatientVideo } from './page/model-patient-video/model-patient-video';
import { HomeUsage } from './page/home-usage/home-usage';
import { HomeGloss } from './page/home-gloss/home-gloss';
import { HomeSentence } from './page/home-sentence/home-sentence';
import { AccountProfile } from './page/account-profile/account-profile';
import { authTokenHttpInterceptInterceptor } from './services/auth-token-http-intercept-interceptor';

@NgModule({
  declarations: [
    App,
    Button,
    Input,
    DataTable,
    Header,
    Login,
    VerifyToRegister,
    Register,
    ForgotPassword,
    ResetPassword,
    HospitalHead,
    Hospitals,
    ModelGloss,
    ModelAslRecognition,
    ModelPatientVideo,
    HomeUsage,
    HomeGloss,
    HomeSentence,
    AccountProfile,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([authTokenHttpInterceptInterceptor])),
    CookieService
  ],
  bootstrap: [App]
})
export class AppModule { }
