import { Component } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { ParamsOfDetailOffer } from '../interfaces/own/paramsOfDetailOffer.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { OFFER } from '../constants/offers.constants';
import { ModalController } from '@ionic/angular';
import { RatingServiceCompanyModalPage } from '../rating-service-company-modal/rating-service-company-modal.page';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.page.html',
  styleUrls: ['./detail-offer.page.scss'],
})
export class DetailOfferPage {

  public shouldShowButtonAcceptOffer: boolean;
  public shouldShowButtonCancelOffer: boolean; 
  public shouldShowButtonFulfilled: boolean;
  public shouldShowButtonServiceRating: boolean;

  constructor(private utilitiesService: UtilitiesService, private activatedRoute: ActivatedRoute, 
              private router: Router, private modalController: ModalController) {
    this.activatedRoute.params.subscribe( (params: ParamsOfDetailOffer) => {
      this.shouldShowButtonAcceptOffer = OFFER.ORIGIN_AVAILABLE == params.origin ? true : false;
      this.shouldShowButtonCancelOffer = OFFER.ORIGIN_APPLIED == params.origin ? true : false;
      this.shouldShowButtonFulfilled = OFFER.ORIGIN_CONFIRMED == params.origin ? true : false;
      this.shouldShowButtonServiceRating = OFFER.ORIGIN_FULFILLED == params.origin ? true : false;
    });
  }

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

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en cancelar oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapCancelOffer(): void {
    this.utilitiesService.showInfoAlert('Oferta Cancelada', 'Se ha cancelado a la oferta correctamente');
  }

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en cumplir oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapFulfilledOffer(): void {
    this.router.navigate(['fulfilled-offer']);
  }

   /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en cumplir oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-02
   * @param void
   * @returns void
   */
  public async handleTapServiceRating() {
    const modal = await this.modalController.create({
      'component': RatingServiceCompanyModalPage,
    });
    modal.present();
  }

}
