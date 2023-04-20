import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/@core/services/error.service';

@Component({
  selector: 'app-internalservererror',
  templateUrl: './internalservererror.component.html',
  styleUrls: ['./internalservererror.component.css']
})
export class InternalServerErrorComponent implements OnInit {

  hasServerError: boolean = false;

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
    this.hasServerError = this.errorService.getLastServerError() !== null;
  }

}
