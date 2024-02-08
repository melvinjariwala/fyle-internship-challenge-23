import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApiCacheInterceptor } from './interceptors/api-cache.interceptor';
import { ApiCacheService } from './services/api-cache.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, UserProfileComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiCacheInterceptor, multi: true },
    ApiCacheService,
    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
