import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/auth/services/auth.service';
import { SpinnerService } from 'src/app/@core/services/spinner.service';

import { EnvironmentService } from 'src/app/@core/services/environment.service';
import { i18nService, ILanguageModel } from 'src/app/@core/i18n/i18n.service';
import { CookieService } from 'ngx-cookie-service';

const langCookieName: string = 'userLang';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = '';
  isAdmin: boolean = false;
  title: string = '';
  defaultLanguage!: ILanguageModel;

  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    public authService: AuthService,
    private envService: EnvironmentService,
    public langService: i18nService,
    private cookie: CookieService
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.title = this.envService.getAppName();
    this.envService.setTitle('Home');
    this.userName = this.authService.getAccountName() || '<Unknown>';
    this.setDefaultLanguage();
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  switchLang(lang: string) {
    this.langService.translate.use(lang);
    this.defaultLanguage = this.langService.languages.find(
      (x) => x.value == lang
    )!;
    this.cookie.set(
      langCookieName,
      lang,
      undefined,
      undefined,
      undefined,
      true
    );
  }

  private setDefaultLanguage(): void {

    if (this.cookie.check(langCookieName)) {
      let lang = this.cookie.get(langCookieName);
      this.defaultLanguage = this.langService.languages.find(
        (x) => x.value == lang
      )!;
      this.switchLang(lang);
      return;
    }


    this.defaultLanguage = this.langService.getDefaultLang();
    this.cookie.set(
      langCookieName,
      this.defaultLanguage.value,
      undefined,
      undefined,
      undefined,
      true
    );
    this.switchLang(this.defaultLanguage.value);
  }
}
