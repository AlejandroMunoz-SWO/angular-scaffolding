import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants';
import { SessionStorageService } from './session.service';
import { NotificationService } from './notification.service';
import { InsightsService as Insights } from '../insights/insights.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private session: SessionStorageService,
    private notificationService: NotificationService,
    private insights: Insights
  ) { }

  public handleServerError = (
    error: HttpErrorResponse,
    redirect: boolean = false
  ) => {
    switch (error.status) {
      case 500:
        this.setServerError(error, redirect, '/errors/500');
        break;
      case 404:
        this.setServerError(error, redirect, '/errors/404');
        break;
      case 401:
        this.setServerError(error, redirect, '/errors/401');
        break;
      default:
        this.setServerError(error, redirect, '/errors/500');
        break;
    }
  };

  public handleClientError = (error: Error) => {
    this.createClientErrorMessage(error);
    this.insights._error(this.errorMessage);
    this.notificationService.showError(this.errorMessage);
  };

  public getLastServerError(): string | null {
    return this.session.getItem(AppConstants.LAST_SERVER_ERROR_KEY);
  }

  private setServerError = (
    error: HttpErrorResponse,
    redirect: boolean,
    redirectTo: string
  ) => {
    this.createServerErrorMessage(error);
    if (redirect) {
      this.session.setItem(
        AppConstants.LAST_SERVER_ERROR_KEY,
        this.errorMessage
      );
      this.insights._error(this.errorMessage);
      this.router.navigate([redirectTo]);
    } else {
      this.insights._error(this.errorMessage);
      this.notificationService.showError(this.errorMessage);
    }
  };

  private createServerErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage =  this.getErrorMessage(error) || error.message;
  };

  private createClientErrorMessage = (error: Error) => {
    this.errorMessage = error.message ? error.message : error.toString();
  };

  private getErrorMessage(error: HttpErrorResponse): string {
    let message = this.errorMessagesMap().get(error.status);
    return message ? message : error.message;
  }

  private errorMessagesMap(): Map<number, string> {
    let map = new Map<number, string>();
    map.set(0, "The connection with the server wasn't stablished.");
    map.set(401, "You don't have permission to access this feature.");
    map.set(403, "You aren't allowed to access this feature.");
    map.set(404, "The resource were not found.");
    map.set(429, "The service is busy, please try it again later.");
    map.set(503, "The service is temporarly unavailable, please try it again later.");
    return map;
  }
}
