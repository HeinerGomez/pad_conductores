import { Component } from '@angular/core';
import { StorageDataService } from 'src/app/services/storage-data.service';
import { Offer } from 'src/app/models/offer';
import { ItemOfferOptions } from 'src/app/interfaces/own/itemOfferOptions.interface';
import { ParamsOfDetailOffer } from 'src/app/interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from 'src/app/constants/offers.constants';
import { NavController } from '@ionic/angular';
import { DynamicBadgeService } from 'src/app/services/dynamic-badge.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-offers-archived',
  templateUrl: './offers-archived.page.html',
  styleUrls: ['./offers-archived.page.scss'],
})
export class OffersArchivedPage {

  public offers: Offer[];
  public itemOptions: ItemOfferOptions;

  constructor(
    private storageDataService: StorageDataService,
    private navController: NavController,
    private dynamicBadgeService: DynamicBadgeService,
    private utilsService: UtilitiesService
  ) {
    this.itemOptions = this.defineItemOptions();
  }

  ionViewDidEnter() {
    this.getOffersArchived();
  }

   /**
   * @description Tiene como objetivo definir las opciones(opciones, funciones), que tienen asociados al componente "ItemOffer"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-29
   * @param event
   * @returns void
   */
  private defineItemOptions(): ItemOfferOptions {
    return {
      'buttonArchive': false,
      'hasChip': false
    };
  }

  /**
   * @description Tiene como objetivo obtener las ofertas archivadas
   */
  private getOffersArchived(): void {
    this.storageDataService.getOffers().then((offers: Offer[]) => {
      // cuando se almacena en localstorage, se pierde la referencia del modelo
      this.offers = (offers as Offer[]).map((offer: Offer) => Object.assign(new Offer(), offer));
      this.dynamicBadgeService.badgeOffersArchivated = this.offers.length;
    }).catch(error => {
      this.offers = [];
      this.dynamicBadgeService.badgeOffersArchivated = 0;
    });
  }

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
  
  /**
   * 
   */
  public handleClickTrashButton(): void {
    this.storageDataService.cleanOffers().then(() => {
      this.utilsService.showSnackbar('Se han limpiado las ofertas archivadas', 'success');
    }).catch(error => {
      this.utilsService.showSnackbar('Error al limpiar las ofertas archivadas', 'danger');
    })
  }

}
