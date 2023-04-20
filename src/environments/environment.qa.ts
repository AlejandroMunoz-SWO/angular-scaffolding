export const environment = {
  production: false,
  name: 'QA',
  appName: '#{appName}#',
  version: '#{version}#',
  backEndUrl: '#{backEndUrl}#',
  tenantId: '#{tenantId}#',
  clientId: '#{clientId}#',
  redirectUri: '#{redirectUri}#',
  appInsightsConnString: '#{appInsightsConnString}',
  errorHandler: {
    maxRetries: 3,
    maxDelayMs: 1000
  },
  i18n: {
    languages: ['es', 'en', 'nl', 'de'],
    defaultLanguage: 'en',
  },
};
