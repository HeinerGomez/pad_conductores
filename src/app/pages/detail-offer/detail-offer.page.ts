import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { OFFER } from '../../constants/offers.constants';
import { ModalController, NavController } from '@ionic/angular';
import { RatingServiceCompanyModalPage } from '../../modals/rating-service-company-modal/rating-service-company-modal.page';
import { Offer } from 'src/app/models/offer';
import { OffersApiService } from 'src/app/services/api/offers-api.service';

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
  public offer: Offer;

  constructor(
    private utilitiesService: UtilitiesService, private activatedRoute: ActivatedRoute, 
    private router: Router, private modalController: ModalController,
    private offerAPIService: OffersApiService, private navController: NavController
  ) {
    const params = this.activatedRoute.snapshot.queryParams;
    this.shouldShowButtonAcceptOffer = OFFER.ORIGIN_AVAILABLE == params.options.origin ? true : false;
    this.shouldShowButtonCancelOffer = OFFER.ORIGIN_APPLIED == params.options.origin ? true : false;
    this.shouldShowButtonFulfilled = OFFER.ORIGIN_FULFILLED == params.options.origin ? true : false;
    this.shouldShowButtonServiceRating = OFFER.ORIGIN_CONFIRMED == params.options.origin ? true : false;
    this.offer = params.offer;
  }

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en aceptar oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param void
   * @returns void
   */
  public handleTapAcceptOffer(): void {
    const data = {
      "driver_id": "1", // temporal
      "offer_id": this.offer.id,
      "vehicle_id": "1", // temporal
      "offer_state_id": "2", // aplicado,
      "latitude":"4.662078", // temporal
      "longitude":"-74.057851" // temporal
    };
    this.utilitiesService.showLoading('Aplicando A Oferta');
    this.offerAPIService.cancelOrAppliedOffer(data).subscribe(() => {
      this.utilitiesService.closeLoading();
    this.utilitiesService.showInfoAlert('Oferta Aplicada', 'Se ha aplicado a la oferta correctamente').then(() => {
        this.navController.navigateBack('/tab-offers/tabs/my-offers');
      });
    }, error => {
      this.utilitiesService.closeLoading();
    });
  }

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en cancelar oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapCancelOffer(): void {
    const data = {
      "driver_id": "1", // temporal
      "offer_id": this.offer.id,
      "vehicle_id": "1", // temporal
      "offer_state_id": "3", // rechazar,
      "latitude":"23234234234", // temporal
      "longitude":"-2131243223" // temporal
    };
    this.utilitiesService.showLoading('Cancelando Oferta');
    this.offerAPIService.cancelOrAppliedOffer(data).subscribe(() => {
      this.utilitiesService.closeLoading();
      this.utilitiesService.showInfoAlert('Oferta Cancelada', 'Se ha cancelado la oferta correctamente').then(() => {
        this.navController.navigateBack('/tab-offers');
      });
    }, error => {
      this.utilitiesService.closeLoading();
    });
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
    this.navController.navigateForward('/fulfilled-offer', {queryParams: this.offer})
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
