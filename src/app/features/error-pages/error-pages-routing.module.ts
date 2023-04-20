import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { InternalServerErrorComponent } from './internalservererror-page/internalservererror.component';
import { NotFoundComponent } from './notfound-page/notfound.component';
import { UnauthorizedComponent } from './unauthorized-page/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '401', component: UnauthorizedComponent },
      { path: '404', component: NotFoundComponent },
      { path: '500', component: InternalServerErrorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule { }
