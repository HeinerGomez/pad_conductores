import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ShouldShowIntroGuard implements CanActivate {

  constructor(private router: Router, private nativeStorage: NativeStorage) {}

  /**
   * @description Tiene como objetivo validar si debe mostrar la pagina introductoria de la aplicación
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28
   * @param route 
   * @param state 
   * @returns boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.determinesShowShouldIntroPage().then( showShouldIntroPage => {
      if (showShouldIntroPage == false) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    });
  }

  /**
   * @description Tiene como objetivo determinar si debe o no mostrar la pagina introductoria de la app
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28 
   * @param void 
   * @returns Promise<boolean>
   */
  private determinesShowShouldIntroPage(): Promise<boolean> {
    const showShouldIntroPage = this.hasConfigApp().then( (hasConfigApp: boolean) => {
      if (hasConfigApp) {
        return this.nativeStorage.getItem('configApp').then( (configApp: any) => {
          if (configApp.hasOwnProperty('slideShown')) {
            return false;
          } else {
            this.setSlideShown(configApp);
            return true;
          }
        });
      } else {
        this.configureApp();
        return true;
      }
    });
    return showShouldIntroPage;
  }
  
  /**
   * @description Tiene como objetivo determinar si ya existe una configuracion en session asociada a la app
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28 
   * @param void 
   * @returns Promise<boolean>
   */
  private hasConfigApp(): Promise<boolean> {
    const hasConfigApp = this.nativeStorage.keys().then( (keys: [] | null) => {
      let _hasConfigApp = false;
      for (const key of keys) {
        if (key == 'configApp') {
          _hasConfigApp = true;
        }
      }
      return _hasConfigApp;
    });
    return hasConfigApp;
  }

  /**
   * @description Tiene como objetivo guardar una configuracion en session para la app
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28 
   * @param void 
   * @returns void
   */
  private configureApp(): void {
    const configApp = {
      "slideShown": true
    }
    this.nativeStorage.setItem('configApp', configApp);
  }

  /**
   * @description Tiene como objetivo añadir un nuevo item a la configuracion actual de la app
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28 
   * @param configApp
   * @returns void
   */
  private setSlideShown(configApp: any): void {
    configApp.slideShown = true;
    this.nativeStorage.setItem('configApp', configApp);
  }

}
