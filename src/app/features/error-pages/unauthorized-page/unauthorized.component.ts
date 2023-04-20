import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/@core/services/error.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  hasServerError: boolean = false;

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
    this.hasServerError = this.errorService.getLastServerError() !== null;
  }

}
