import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './@core/auth/services/auth.service';
import { environment as env } from 'src/environments/environment';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  InteractionStatus,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet *ngIf="!authService.isIframe"></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  title = `${env.appName} [${env.name}]`;
  isLoggedIn: boolean = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.msalService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.authService.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.authService.setLoginDisplay();
        this.authService.checkAndSetActiveAccount();
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
