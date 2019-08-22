import { Component, OnInit } from '@angular/core';
import { StorageDataService } from '../../services/storage-data.service';
import { UserInSession } from '../../interfaces/own/userInSession.interf';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { MenuController, NavController } from '@ionic/angular';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from '../../constants/offers.constants';
import { Offer } from 'src/app/models/offer';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { DynamicBadgeService } from 'src/app/services/dynamic-badge.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage {
  
  public offers: Offer[];
  public itemOptions: ItemOfferOptions;
  public enabledRefresh: boolean;

  constructor(
    private menuController: MenuController, private router: Router,
    private offerAPIService: OffersApiService, private navController: NavController, 
    private dynamicBadgesService: DynamicBadgeService
  ) { 
    this.menuController.enable(true);
    this.enabledRefresh = true;
    this.itemOptions = this.defineItemOptions();
    this.offers = [];
  }

  ionViewDidEnter() {
    this.getOffersAvailable();
  }

  private getOffersAvailable(): void {
    this.offerAPIService.getOffersAvailable().subscribe((offers: Offer[]) => {
      this.offers = offers;
      this.dynamicBadgesService.offersAvailable = this.offers.length;
    });
  }

  /**
   * @description Tiene como objetivo definir las opciones(opciones, funciones), que tienen asociados al componente "ItemOffer"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-29
   * @param event
   * @returns void
   */
  private defineItemOptions(): ItemOfferOptions {
    const params: ParamsOfDetailOffer = {
      'origin': OFFER.ORIGIN_AVAILABLE,
      'buttonArchive': true
    };
    return {
      'handleTapItemOffer': (offer: Offer) => {
        const _params = {
          options: params,
          offer
        };
        this.navController.navigateForward('/detail-offer', {queryParams: _params});
      },
      'handleTapButtonArchive': () => {
        console.log("Archivado");
      }, 
      'buttonArchive': true,
      'hasChip': true
    };
  }

  /**
   * @description Tiene como objetivo manejar el refresh cuando se desliza la pantalla hacia arriba
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-10
   * @param event
   * @returns void
   */
  public handleSlideDownRefresh(event): void {
    setTimeout( () => {
      this.getOffersAvailable();
      event.target.complete();
    }, 1500);
  }

   /**
   * @description Tiene como objetivo manejar el scroll para evitar que se cruze con el evento del scroll hacia arriba,
   *              para el recargado de las ofertas
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-11
   * @param event
   * @returns void
   */
  public handleScroll(event): void {
    if (event.srcElement.scrollTop == 0) {
      this.enabledRefresh = true;
    } else {
      this.enabledRefresh = false;
    }
  }

}
