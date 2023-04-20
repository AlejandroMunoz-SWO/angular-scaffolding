import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/@core/services/environment.service';
import { i18nService } from 'src/app/@core/i18n/i18n.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  title: string = "";
  version: string = "";
  environment: string = "";

  constructor(private titleService: EnvironmentService) { }

  ngOnInit(): void {
    this.titleService.setTitle('About');
    this.title = this.titleService.getAppName();
    this.version = this.titleService.getAppVersion();
    this.environment = this.titleService.getEnvironment();
  }
}
