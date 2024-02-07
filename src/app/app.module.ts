import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, UserInfoComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
