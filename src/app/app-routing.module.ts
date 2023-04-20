import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';

// RBAC -> Role-Based authorization
import { roles } from './@core/auth/config/roles.config';
import { RoleGuard } from './@core/auth/guards/role.guard';

// RBAC -> Group-Based authorization
import { groups } from './@core/auth/config/groups.config';
import { GroupGuard } from './@core/auth/guards/group.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [MsalGuard, GroupGuard],
    data: {
      expectedGroup: groups.groupMember
    }
    // *****************************************************************
    // ** Example about how to change Group-Based by Role-Based AuthZ **
    // *****************************************************************
    // canActivate: [MsalGuard, RoleGuard],
    // data: {
    //   expectedRole: roles.Admin
    // }
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [MsalGuard]
  },
  {
    path: 'errors',
    loadChildren: () => import('./features/error-pages/error-pages.module').then(m => m.ErrorPagesModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
