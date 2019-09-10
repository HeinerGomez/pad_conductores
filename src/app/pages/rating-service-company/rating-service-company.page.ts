import { Component, OnInit } from '@angular/core';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from '../../constants/offers.constants';
import { Router } from '@angular/router';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { Offer } from 'src/app/models/offer';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rating-service-company',
  templateUrl: './rating-service-company.page.html',
  styleUrls: ['./rating-service-company.page.scss'],
})
export class RatingServiceCompanyPage implements OnInit {

  public offersPerQualification: Offer[];
  public itemOptions: ItemOfferOptions;

  constructor(
    private router: Router,
    private navController: NavController,
    private offersAPIService: OffersApiService
  ) {
    this.itemOptions = this.defineItemOptions();
    this.offersPerQualification = [];
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getOffersPerQualification();
  }

  private getOffersPerQualification() {
    const driverId = 1; // temporal
    this.offersAPIService.getOffersPerQualification(driverId).subscribe((offers: Offer[]) => this.offersPerQualification = offers);
  }

   /**
   * @description Tiene como objetivo definir las opciones(opciones, funciones), que tienen asociados al componente "ItemOffer"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-02
   * @param event
   * @returns void
   */
  private defineItemOptions(): ItemOfferOptions {
    const params: ParamsOfDetailOffer = {
      'origin': OFFER.ORIGIN_CONFIRMED,
      'buttonArchive': false
    };
    return {
      'handleTapItemOffer': (offer: Offer) => {
        const _params = { options: params, offer }
        this.navController.navigateForward('/detail-offer', { queryParams: _params})
      },
      'buttonArchive': false,
      'hasChip': false
    };
  }

  /**
   * @description Tiene como objetivo manejar el refresh cuando se desliza la pantalla hacia arriba
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param event
   * @returns void
   */
  public handleSlideDownRefresh(event): void {
    setTimeout( () => {
      this.getOffersPerQualification();
      event.target.complete();
    }, 1500);
  }

}
