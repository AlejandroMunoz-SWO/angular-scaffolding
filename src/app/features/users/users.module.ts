import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserListComponent } from './user-list/user-list.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    TranslateModule
  ]
})
export class UsersModule { }
