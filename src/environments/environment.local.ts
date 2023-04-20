export const environment = {
  production: false,
  name: 'Local',
  appName: 'SWO AS Angular Material Starter Kit',
  version: '1.0.0-beta',
  backEndUrl: 'https://localhost:5001',
  tenantId: '8d9934ac-b4d0-4ae6-9e75-0b54dbf6a4bb', // this value could be: <your tenant id GUID>
  clientId: 'ef5ec008-df8c-4af8-bb5d-5eef2cbec441', // Azure AD Client Id (App ID)
  redirectUri: 'https://localhost:4200',
  appInsightsConnString: 'InstrumentationKey=36b5966b-4b00-41c3-ad6d-2cef6ffc52d6;IngestionEndpoint=https://westeurope-4.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/',
  errorHandler: {
    maxRetries: 1,
    maxDelayMs: 1000,
  },
  i18n: {
    languages: ['es', 'en', 'nl', 'de'],
    defaultLanguage: 'en',
  },
};
