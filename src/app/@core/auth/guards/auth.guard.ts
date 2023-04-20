import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Observable, of, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status == InteractionStatus.None),
      switchMap(() => {
        if (this.authService.isLoggedIn()) {
          return of(true);
        }

        console.log("MSAL redirect Url: " + state.url);
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }
}
