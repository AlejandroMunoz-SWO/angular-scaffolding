import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { UnauthorizedComponent } from './unauthorized-page/unauthorized.component';
import { InternalServerErrorComponent } from './internalservererror-page/internalservererror.component';
import { NotFoundComponent } from './notfound-page/notfound.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UnauthorizedComponent, InternalServerErrorComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule, ErrorPagesRoutingModule, TranslateModule],
})
export class ErrorPagesModule {}
