import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';
import { NotificationService } from '../../services/notification.service';

interface Account extends AccountInfo {
  idTokenClaims?: {
    roles?: string[]
  }
}

interface RoleInfo {
  expectedRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private notificationService: NotificationService,
    private authService: MsalService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const payload = JSON.stringify(route.data);
      let role = <RoleInfo>JSON.parse(payload);

      let account: Account = this.authService.instance.getActiveAccount()!;

      if (!account.idTokenClaims?.roles) {
        this.showMessage('Token does not have roles claim. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
        this.router.navigate(['/401']);
        return false;
      } else if (!account.idTokenClaims?.roles?.includes(role.expectedRole)) {
        this.showMessage('You do not have access as expected role is missing. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
        this.router.navigate(['/401']);
        return false;
      }

      return true;
  }

  private showMessage(message: string): void {
    this.notificationService.showInfo(message);
  }
}
