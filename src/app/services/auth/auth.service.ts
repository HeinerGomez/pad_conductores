import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  public user: BehaviorSubject<any>;
  private currentUser: Observable<any>;
  private deviceId: string;

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private oneSignal: OneSignal
  ) {
    this.getDeviceId().then((deviceId: string) => {
      this.deviceId = deviceId;
      console.warn("El device ID: ", deviceId);
    });
    this.token = localStorage.getItem('token');
    this.user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.user.asObservable();
  }

  get currentUserValue(): any {
    return this.user.value;
  }

  login = (email: string, password: string) => {
    // El parámetro ‘app’ hace referencia al código único específico de la aplicación, la cual debe estar registrada previamente en el SCA
    const _params = { document_number: email, password: password, app: 'central-pad-movil', device_id: this.deviceId }; // el email realmente es el numero del documento
    return this.http.get(`${environment.URL_API}/users/authScaBackendApp`, {params: _params}).pipe(map((response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        const userAndPwd = {
          'user': email,
          'pwd': password
        };
        localStorage.setItem('userAndPwd', JSON.stringify(userAndPwd));
        this.user.next(response.data);
        return response;
      }
    }));
  };

  isAuthenticated = () => !!this.currentUserValue;

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userAndPwd');
    this.user.next(null);
    this.router.navigate(['/login']);
  };

  private async getDeviceId() {
    const data = await this.oneSignal.getIds();
    return data.userId;
  }

}