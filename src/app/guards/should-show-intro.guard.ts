import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShouldShowIntroGuard implements CanActivate {

  constructor(private router: Router) {}

  /**
   * @description Tiene como objetivo validar si debe mostrar la pagina introductoria de la aplicación
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.router.navigate(['/home']);
    return false;
  }
  
}
