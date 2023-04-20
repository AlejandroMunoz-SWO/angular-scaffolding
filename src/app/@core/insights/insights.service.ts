import { ErrorHandler, Injectable } from '@angular/core';
import {
  ApplicationInsights,
} from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { MsalService } from '@azure/msal-angular';

const enum SeverityLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  private angularPlugin = new AngularPlugin();

  private appInsights = new ApplicationInsights({
    config: {
      connectionString: env.appInsightsConnString,
      enableCorsCorrelation: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
      correlationHeaderExcludedDomains: ['*.queue.core.windows.net'],
      extensions: [this.angularPlugin],
      extensionConfig: {
        [this.angularPlugin.identifier]: {
          router: this.router,
          errorServices: [new ErrorHandler()], // Default Angular error handler
        },
      },
    },
  });

  private customProps: Map<string, any>;

  constructor(private msalService: MsalService, private router: Router) {
    this.appInsights.loadAppInsights();
    if (this.msalService.instance.getActiveAccount() !== null) {
      const accountInfo = this.msalService.instance.getActiveAccount()!;
      this.appInsights.setAuthenticatedUserContext(
        accountInfo.username,
        accountInfo.homeAccountId,
        true
      );
    }
    this.customProps = this.getCustomProps();

    this.appInsights.addTelemetryInitializer((item) => {
      item.name = `${env.appName} Telemetry`,
      item.data = this.customProps,
      item.ext = this.customProps
    })
  }

  _error(message: string) {
    this.appInsights.trackException({
      exception: new Error(message),
      properties: this.customProps,
      severityLevel: SeverityLevel.Error,
    });
  }

  _warn(message: string) {
    this.appInsights.trackTrace({
      message: message,
      properties: this.getCustomProps(),
      severityLevel: SeverityLevel.Warning,
    });
  }

  _info(message: string) {
    this.appInsights.trackTrace({
      message: message,
      properties: this.customProps,
      severityLevel: SeverityLevel.Information,
    });
  }

  _log(message: string) {
    this.appInsights.trackTrace({
      message: message,
      properties: this.customProps,
      severityLevel: SeverityLevel.Verbose,
    });
  }

  _event(eventId: string, name: string) {
    this.appInsights.trackEvent({
      name: name,
      iKey: eventId,
      properties: this.customProps,
    });
  }

  private getCustomProps(): Map<string, any> {
    let map = new Map<string, any>();
    map.set('App', env.appName);
    map.set('Version', env.version);
    map.set('Environment', env.name);
    return map;
  }
}
