import { Component } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.page.html',
  styleUrls: ['./detail-offer.page.scss'],
})
export class DetailOfferPage {

  constructor(private utilitiesService: UtilitiesService) { }

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en aceptar oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param void
   * @returns void
   */
  public handleTapAcceptOffer(): void {
    this.utilitiesService.showInfoAlert('Oferta Aplicada', 'Se ha aplicado a la oferta correctamente');
  }

}
