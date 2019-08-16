import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private navController: NavController) {

  }

  /**
   * @description Tiene como objetivo controlar el evento de hacer click o tap en el boton de login
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @date 2019-03-29
   * @returns void
   */
  public handleBtnLogin(): void {
    this.navController.navigateForward('/login');
  }

  /**
   * @description Tiene como objetivo controlar el evento de hacer click o tap en el boton de login
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @date 2019-03-29
   * @returns void
   */
  public handleBtnRegister(): void {
    this.navController.navigateForward('/register');
  }

}