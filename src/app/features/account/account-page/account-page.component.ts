import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/@core/services/environment.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(private envService: EnvironmentService) { }

  ngOnInit() {
    this.envService.setTitle('Account');
  }
}
