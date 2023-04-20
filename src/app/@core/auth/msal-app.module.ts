import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MsalModule,
  MsalInterceptor,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MSAL_GUARD_CONFIG,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';

import { msalInstanceFactory, msalInterceptorConfigFactory, msalGuardConfigFactory } from './config/auth.config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { MSGraphService } from 'src/app/@core/services/msgraph.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { GroupGuard } from './guards/group.guard';

import { SpinnerInterceptor } from '../interceptors/spinner.interceptor';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: msalGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: msalInterceptorConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard,
    AuthGuard,
    RoleGuard,
    GroupGuard,
    AuthService,
    MSGraphService
  ],
})
export class MsalAppModule { }
