import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

import { UserType, UserMemberOfType } from '../auth/model/user.model';
import { protectedResources as resources } from '../auth/config/auth.config';

@Injectable({
  providedIn: 'root',
})
export class MSGraphService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getMyProfile(): Observable<UserType> {
    return this.http.get<UserType>(resources.graphUserProfile.endpoint);
  }

  getMyGroups(): Observable<UserMemberOfType> {
    return this.http.get<UserMemberOfType>(resources.graphUserGroups.endpoint);
  }

  getMyPhoto(): Observable<SafeUrl> {
    return this.http.get(resources.graphUserPhoto.endpoint, { responseType: 'blob'})
      .pipe(map(blob => {
        let url = window.URL;
        return this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(blob));
      }));
  }

  getNextPage(nextPage: any) {
    return this.http.get(nextPage);
  }
}
