import { Component } from '@angular/core';
import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment.prod';
import { UtilitiesService } from './services/utilities.service';

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
    private navController: NavController,
    private oneSignal: OneSignal,
    private utilsService: UtilitiesService
  ) {
    this.menuController.enable(false);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#000000');
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  private setupPush() {
    this.oneSignal.startInit(`${environment.APP_ID_ONE_SIGNAL}`, `${environment.ANDROID_ID}`);
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      console.log("Data One Signal: ", data);
      this.utilsService.showSnackbar('Notificado', 'primary');
    });
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;
      console.log("Data One Signal Opened: ", data);
      this.utilsService.showSnackbar('Notificado', 'primary');
    });
    this.oneSignal.endInit();
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
