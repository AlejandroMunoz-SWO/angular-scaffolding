import { Injectable, Inject } from '@angular/core';
import { AuthenticationResult, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import {
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isIframe = false;
  loginDisplay = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private http: HttpClient
  ) {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      let selectedAccount;

      accounts.forEach((account) => {
        if (account.tenantId == env.tenantId) {
          selectedAccount = account;
        }
      });

      if (selectedAccount) {
        this.authService.instance.setActiveAccount(selectedAccount);
      } else {
        this.authService.instance.setActiveAccount(accounts[0]);
      }
    }
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  getAccountName(): string | undefined {
    if (this.authService.instance.getActiveAccount() == null) {
      return undefined;
    }
    return this.authService.instance.getActiveAccount()?.name;
  }
}
