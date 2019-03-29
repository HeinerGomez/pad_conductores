import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {

  }

  /**
   * @description Tiene como objetivo controlar el evento de hacer click o tap en el boton de login
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-03-29
   * @returns void
   */
  public handleBtnLogin(): void {
    this.router.navigate(['/login']);
  }

}
