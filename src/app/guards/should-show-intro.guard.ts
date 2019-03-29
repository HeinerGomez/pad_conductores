import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ShouldShowIntroGuard implements CanActivate {

  private shouldShowIntroPage: boolean;

  constructor(private router: Router, private nativeStorage: NativeStorage) {}

  /**
   * @description Tiene como objetivo validar si debe mostrar la pagina introductoria de la aplicación
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-28
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("Funcion determina: ", this.determinesShowShouldIntroPage());
    return this.determinesShowShouldIntroPage().then( showShouldIntroPage => {
      console.log("Debe mostrar slide: ", showShouldIntroPage);
      if (showShouldIntroPage == false) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    });
  }

  private determinesShowShouldIntroPage(): Promise<boolean> {
    const showShouldIntroPage = this.hasConfigApp().then( (hasConfigApp: boolean) => {
      if (hasConfigApp) {
        return this.nativeStorage.getItem('configApp').then( (configApp: any) => {
          console.log("config: ", configApp);
          if (configApp.hasOwnProperty('slideShown')) {
            return false;
          } else {
            this.setSlideShown(configApp);
            return true;
          }
        });
      } else {
        this.configureApp();
        console.log("retorna un true gigante ");
        return true;
      }
    });
    return showShouldIntroPage;
  }
  
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

  private configureApp(): void {
    const configApp = {
      "slideShown": true
    }
    this.nativeStorage.setItem('configApp', configApp);
  }

  private setSlideShown(configApp: any): void {
    configApp.slideShown = true;
    this.nativeStorage.setItem('configApp', configApp);
  }

}
