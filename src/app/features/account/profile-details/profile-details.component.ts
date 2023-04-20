import { Component, OnInit } from '@angular/core';
import { MSGraphService } from 'src/app/@core/services/msgraph.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  alias: string = '';
  photo: any;

  constructor(private graphService: MSGraphService) {}

  ngOnInit() {
    this.setUserProfile();
  }

  private setUserProfile(): void {
    this.graphService.getMyProfile().subscribe((usr) => {
      this.fullName = usr.displayName!;
      this.email = usr.mail!;
      this.alias = usr.jobTitle!;
    });

    this.setUserPhoto();
  }

  private setUserPhoto(): void {
    this.graphService.getMyPhoto().subscribe((photo) => (this.photo = photo));
  }
}
