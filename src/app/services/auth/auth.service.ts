import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  public user: BehaviorSubject<any>;
  private currentUser: Observable<any>;

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem('token');
    this.user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.user.asObservable();
  }

  get currentUserValue(): any {
    return this.user.value;
  }

  login = (email: string, password: string) => {
    // El parámetro ‘app’ hace referencia al código único específico de la aplicación, la cual debe estar registrada previamente en el SCA
    return this.http.post(`${environment.SCA_URL}/auth/login`, { email: email, password: password, app: '	central-pad-movil' }).pipe(map((response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        this.user.next(response.data);
        return response;
      }
    }));
  };

  isAuthenticated = () => !!this.currentUserValue;

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['/login']);
  };

}