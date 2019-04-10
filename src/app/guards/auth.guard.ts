import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * @description 
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param route 
   * @param state 
   * @returns boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().then( isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/tab-offers', {shouldSessionMessage: true}]);
        return false;
      } else {
        return true;
      }
    }).catch( error => {
      return true;
    });
  }
}
