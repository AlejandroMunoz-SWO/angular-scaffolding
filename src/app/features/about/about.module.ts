import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { SharedModule } from '../../shared/shared.module';

// This module must be imported in every module of your application
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule,
    TranslateModule
  ]
})
export class AboutModule { }
