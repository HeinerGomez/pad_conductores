import { Component } from '@angular/core';
import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuController: MenuController,
    private authService: AuthService,
    private navController: NavController
  ) {
    this.menuController.enable(false);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * @description Tiene como objetivo manejar la navegacion del menu y controlando la habilitacion y des-habilitacion del menu
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-16
   * @param event
   * @returns void
   */
  public handleTapItemMenu(route: String): void {
    this.menuController.close();
    if (route == '/home') {
      this.authService.UnAuhenticated().then(() => {
        this.navController.navigateRoot(`${route}`).then(() => {
          this.menuController.enable(false);
        });
      });
    } else {
      this.navController.navigateRoot([`${route}`]);
    }
  }
}
