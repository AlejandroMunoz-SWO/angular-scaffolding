import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

export type UserType = {
  Id: string;
  Username: string;
  Email: string;
};

const endpoint = '/api/RoleBasedUsers';
const apiVersion = 'api-version=1.0';

export function apiUrl(applyVersion: boolean): string {
  const baseUrl: string = env.backEndUrl;
  if (applyVersion) {
    return `${baseUrl}${endpoint}?${apiVersion}`;
  }
  return `${baseUrl}${endpoint}`;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserType[]> {
    const url = apiUrl(true);
    return this.httpClient.get<Array<UserType>>(url);
  }
}
