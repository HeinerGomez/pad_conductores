import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MainService } from '../app-services/main.service';
import { StorageService } from '../app-services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _mainService: MainService,
    private _storageService: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {

    // Las URLs a continuación están sujetas a cambios, dependiendo de la implementación de la aplicación por parte del desarrollador
    if (state.url !== '/login' && state.url !== '/unauthorized') {

      if (state.url === '/') {
        setTimeout(() => this.router.navigate(['/tab-offers/tabs/offers']), 100);
        return true;
      }

      return new Promise(resolve => {
        if (this._authService.isAuthenticated()) {
          this._mainService.userData(this._authService.currentUserValue.id).subscribe((response: any) => {
            this._mainService.setUserData(response.data);
            if (state.url === '/tab-offers/tabs/offers') {
              resolve(true);
            } else {
              if (this._mainService.getRoutePermission(response.data.module_permissions, state.url, 'access')) {
                this._storageService.setItem('token', localStorage.getItem('token'));
                resolve(true);
              } else {
                this._mainService.setUserData(null);
                this.router.navigate(['/login']); // aca iba unauthorized
                resolve(false);
              }
            }
          });
        } else {
          this._mainService.setUserData(null);
          this._authService.logout();
          resolve(false);
        }

      });
    } else if (state.url === '/unauthorized') {
      return true;
    }
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._mainService.getUserData();
  }

}