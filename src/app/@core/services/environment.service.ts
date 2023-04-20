import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private ts: Title) {}

  /**
   * Sets the navigator's title.
   * It includes the App's version, environment name and page's name.
   * @param pageName the name of the page or section i.e. About, Home, Dashboard, etc.
   */
  public setTitle(pageName: string) {
    let title: string = '';
    if (env.production) {
      title = `${env.appName} ${env.version} > ${pageName}`;
    } else {
      title = `${env.appName} ${env.version} [${env.name}] > ${pageName}`;
    }
    this.ts.setTitle(title);
  }

  public getAppNameAndVersion(): string {
    return `${env.appName} v${env.version}`;
  }

  public getAppName(): string {
    return `${env.appName}`;
  }

  public getAppVersion(): string {
    return `v${env.version}`;
  }

  public getEnvironment(): string {
    return !env.production ? `${env.name}` : "Production";
  }

  public getTitle(): string {
    return this.ts.getTitle();
  }

  public getLanguages(): string[] {
    return env.i18n.languages;
  }

  public getDefaultLanguage(): string {
    return env.i18n.defaultLanguage;
  }
}
