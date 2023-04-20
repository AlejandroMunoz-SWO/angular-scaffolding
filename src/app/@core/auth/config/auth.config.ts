import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment as env } from 'src/environments/environment';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: env.clientId,
      authority: `https://login.microsoftonline.com/${env.tenantId}`,
      redirectUri: env.redirectUri,
      postLogoutRedirectUri: env.redirectUri,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: env.production ? LogLevel.Warning : LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  const res = protectedResources;

  protectedResourceMap.set(res.backEnd.endpoint, res.backEnd.scopes);
  protectedResourceMap.set(
    res.graphUserProfile.endpoint,
    res.graphUserProfile.scopes
  );
  protectedResourceMap.set(
    res.graphUserPhoto.endpoint,
    res.graphUserPhoto.scopes
  );
  protectedResourceMap.set(
    res.graphUserGroups.endpoint,
    res.graphUserGroups.scopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: '/',
  };
}

function loggerCallback(logLevel: LogLevel, message: string) {
  switch (logLevel) {
    case LogLevel.Error:
      console.error('MSAL error: ' + message);
      break;
    case LogLevel.Warning:
      console.warn('MSAL warn: ' + message);
      break;
    case LogLevel.Trace:
      console.info('MSAL trace: ' + message);
      break;
    case LogLevel.Verbose:
      console.log('MSAL log: ' + message);
      break;
  }
}

/**
 * Add your protected resources here.
 * This will be used by the MSAL Interceptor for adding the access token
 * automatically in every HTTP request.
 */
export const protectedResources = {
  backEnd: {
    endpoint: `${env.backEndUrl}/**/*`,
    scopes: [`api://${env.clientId}/access_as_user`],
  },
  graphUserProfile: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['User.Read'],
  },
  graphUserPhoto: {
    endpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value',
    scopes: ['User.Read.All'],
  },
  graphUserGroups: {
    endpoint: 'https://graph.microsoft.com/v1.0/me/memberOf',
    scopes: ['User.Read', 'GroupMember.Read.All'],
  },
};
