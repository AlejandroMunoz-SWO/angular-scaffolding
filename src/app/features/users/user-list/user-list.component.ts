import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentService } from 'src/app/@core/services/environment.service';
import { NotificationService } from 'src/app/@core/services/notification.service';
import { UsersService, UserType } from 'src/app/features/users/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {

  users: UserType[] = new Array<UserType>();

  displayedColumns: string[] = [
    'id',
    'username',
    'email'
  ];

  dataSource = new MatTableDataSource(this.users);

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizes = [5, 10, 15];

  constructor(
    private notificationService: NotificationService,
    private envService: EnvironmentService,
    private service: UsersService
  ) {}

  ngOnInit(): void {
    this.envService.setTitle('Users');
    this.service.getUsers().subscribe(data => this.users = data);
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
  }
}
