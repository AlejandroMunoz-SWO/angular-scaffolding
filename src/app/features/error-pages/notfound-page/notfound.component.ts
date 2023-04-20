import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/@core/services/error.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotFoundComponent implements OnInit {

  hasServerError: boolean = false;

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
    this.hasServerError = this.errorService.getLastServerError() !== null;
  }
}
