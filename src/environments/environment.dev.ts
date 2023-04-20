export const environment = {
  production: false,
  name: 'Development',
  appName: '#{appName}#',
  version: '#{version}#',
  backEndUrl: '#{backEndUrl}#',
  tenantId: '#{tenantId}#',
  clientId: '#{clientId}#',
  redirectUri: '#{redirectUri}#',
  appInsightsConnString: '#{appInsightsConnString}',
  errorHandler: {
    maxRetries: 1,
    maxDelayMs: 1000,
  },
  i18n: {
    languages: ['es', 'en', 'nl', 'de'],
    defaultLanguage: 'en',
  },
};
