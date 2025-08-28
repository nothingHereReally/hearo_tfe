import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Button } from './essential/button/button';
import { Input } from './essential/input/input';
import { Home } from './page/home/home';
import { DataTable } from './essential/data-table/data-table';

@NgModule({
  declarations: [
    App,
    Button,
    Input,
    Home,
    DataTable
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
