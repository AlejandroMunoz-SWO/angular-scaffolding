import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalAppModule } from './@core/auth/msal-app.module';
import { MsalRedirectComponent } from '@azure/msal-angular';

import { MaterialModule } from './material.module';
import { NotificationService } from './@core/services/notification.service';
import { EnvironmentService } from './@core/services/environment.service';
import { SharedModule } from './shared/shared.module';

import { i18nModule } from './@core/i18n/i18n.module';
import { i18nService } from './@core/i18n/i18n.service';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from './@core/services/session.service';

import { InsightsModule } from './@core/insights/insights.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule.forRoot(),
    MsalAppModule,
    AppRoutingModule,
    i18nModule,
    InsightsModule
  ],
  providers: [
    NotificationService,
    EnvironmentService,
    i18nService,
    CookieService,
    SessionStorageService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
