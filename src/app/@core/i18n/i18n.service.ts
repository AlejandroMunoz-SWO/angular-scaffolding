import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentService } from '../services/environment.service';

export interface ILanguageModel {
  value: string;
  label: string;
  img: string
}

@Injectable({
  providedIn: 'root',
})
export class i18nService {

  languages: ILanguageModel[] = []

  constructor(
    public translate: TranslateService,
    private envService: EnvironmentService
  ) {

    this.languages = new Array<any>();
    translate.addLangs(envService.getLanguages());
    translate.setDefaultLang(envService.getDefaultLanguage());
    this.buildLanguagesList();
  }

  getDefaultLang(): ILanguageModel {
    const defaultLang =
      this.languages.find(lang => lang.value == this.translate.getDefaultLang());
    return defaultLang!;
  }

  private buildLanguagesList(): void {
    const langs = this.translate.getLangs();
    langs.forEach(lang => {
      this.languages.push({
        value: lang,
        label: this.getLangName(lang),
        img: `assets/images/flags/${lang}.svg`
      })
    });
  }

  private getLangName(lang: string): string {
    switch (lang) {
      case 'en':
        return 'English (GB)';
      case 'es':
        return 'Español (España)';
      case 'de':
        return 'German';
      case 'nl':
        return 'Dutch';
      default:
        return 'English (GB)'
    }
  }
}
