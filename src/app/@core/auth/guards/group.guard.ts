import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';

import { MSGraphService } from 'src/app/@core/services/msgraph.service';
import { UserMemberOfType, UserType } from '../model/user.model';
import { NotificationService } from '../../services/notification.service';

interface Account extends AccountInfo {
  idTokenClaims?: {
    preferred_username?: string;
    groups?: string[];
    _claim_names?: {
      groups: string | string[];
    };
    _claim_sources?: {
      src1: {
        endpoint: string | string[];
      };
    };
  };
}

interface GroupInfo {
  expectedGroup: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupGuard implements CanActivate {
  constructor(
    private notificationService: NotificationService,
    private graphService: MSGraphService,
    private authService: MsalService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const payload = JSON.stringify(route.data);
    const group = <GroupInfo>JSON.parse(payload);

    let isValidUser: boolean = false;

    let account: Account = this.authService.instance.getActiveAccount()!;

    let user: UserMemberOfType = {
      displayName: '',
      groupIDs: new Array<string>(),
    };

    this.graphService.getMyGroups().subscribe(data => {
      user.displayName = data.displayName;
      user.groupIDs = data.groupIDs;
    });

    isValidUser = this.isValidUser(user, account, group.expectedGroup);

    if (!isValidUser) {
      this.router.navigate(['/errors/401']);
    }

    return isValidUser;
  }

  private isValidUser(
    user: UserMemberOfType,
    account: Account,
    group: string
  ): boolean {
    let isValid: boolean = false;

    if (user.groupIDs?.length == 0) {
      user.groupIDs = account.idTokenClaims?.groups;
    }

    if (account.idTokenClaims?.groups?.includes(group) ||
        user.groupIDs?.includes(group)) {
      return true;
    }

    if (account.idTokenClaims?._claim_names) {
      isValid =  account.idTokenClaims?._claim_names.groups?.includes(group)!;
      if (!isValid) {
        this.notificationService.showError('Token does not have groups claim.');
      }
    }
    return false;
  }
}
