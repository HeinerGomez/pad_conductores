import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  localUserData: any;

  constructor(
    private http: HttpClient
  ) { }

  get permissions() {
    return Constants.PERMISSIONS;
  }

  getUserData = () => this.localUserData;
  setUserData = (userData: any) => this.localUserData = userData;

  userData = (userID: number): Observable<any> => {
    return this.http.get(`${environment.SCA_URL}/users/${userID}/user-data`).pipe(map((response: any) => response));
  }

  getRoutePermission = (data: any, route: string, permission: string) => {
    let index = data.findIndex((modulePermission: any) => {
      let permissionCode = modulePermission.codename.split(' ')[2];
      return ((modulePermission.module.route === route) && (permissionCode === permission));
    });
    return (index !== -1);
  }

}