import { Component } from '@angular/core';

@Component({
  selector: 'app-offers-archived',
  templateUrl: './offers-archived.page.html',
  styleUrls: ['./offers-archived.page.scss'],
})
export class OffersArchivedPage {

  constructor() { }

   /**
   * @description Tiene como objetivo manejar el refresh cuando se desliza la pantalla hacia arriba
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-20
   * @param event
   * @returns void
   */
  public handleSlideDownRefresh(event): void {
    setTimeout( () => {
      event.target.complete();
    }, 3000);
  }

}
