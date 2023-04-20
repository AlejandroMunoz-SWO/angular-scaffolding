import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/@core/services/notification.service';
import { AuthService } from 'src/app/@core/auth/services/auth.service';
import { EnvironmentService } from 'src/app/@core/services/environment.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private envService: EnvironmentService) {
  }

  ngOnInit() {
    this.envService.setTitle('Home');

    this.currentUser = this.authService.getAccountName();

    setTimeout(() => {
      this.notificationService.showInfo(`Wellcome, ${this.currentUser}!`);
    });
  }
}
