import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of, timer } from 'rxjs';
import { retry, catchError, RetryConfig } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(this.getRetryConfig()),
      catchError((error: any) => {
        return of(error);
      })
    );
  }

  private getRetryConfig(): RetryConfig {
    return {
      count: env.errorHandler.maxRetries,
      delay: (error: any, retryCount: number) => {
        const httpError = <HttpErrorResponse>error;

        this.handleErrorMessage(httpError, retryCount);

        if (httpError.status == 429 || httpError.status == 503) {
          return timer(env.errorHandler.maxDelayMs * (retryCount ** 2));
        }

        return timer(0);
      },
    };
  }

  private handleErrorMessage(error: HttpErrorResponse, retryCount: number) {
    if (retryCount == env.errorHandler.maxRetries) {
      this.errorService.handleServerError(error, error.status == 500);
    }
  }
}
