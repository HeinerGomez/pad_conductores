import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { Router } from '@angular/router';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from '../../constants/offers.constants';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
})
export class MyOffersPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  public shouldShowOffersApplied: boolean;
  public shouldShowOffersConfirmed: boolean;
  public offersApplied: Offer[]; 
  public offersConfirmed: Offer[];
  public itemOptions: ItemOfferOptions;

  constructor(
    private router: Router,
    private offersAPIService: OffersApiService
    ) { 
    this.shouldShowOffersApplied = true;
    this.shouldShowOffersConfirmed = false;
    this.itemOptions = this.defineItemOptions();
    
  }

  ngOnInit() {
    this.segment.value = 'applied';
    const driverId = 1; // temporal
    this.offersAPIService.getOffersApplied(driverId).subscribe((offers: Offer[]) => this.offersApplied = offers);
    this.offersAPIService.getOffersConfirmed(driverId).subscribe((offers: Offer[]) => this.offersConfirmed = offers);
  }

  /**
   * @description Tiene como objetivo manejar los cambios de los segmentos o secciones de "mis ofertas aplicadas"
   *              y "mis ofertas confirmadas"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param event
   * @returns void
   */
  public handleSegmentChanges(event): void {
    const segmentValue = event.detail.value;
    if (segmentValue == 'applied') {
      this.shouldShowOffersApplied = true;
      this.shouldShowOffersConfirmed = false;
    } else {
      this.shouldShowOffersApplied = false;
      this.shouldShowOffersConfirmed = true;
    }
    this.itemOptions = this.defineItemOptions();
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
      event.target.complete();
    }, 3000);
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
      'origin': this.shouldShowOffersApplied === true ? OFFER.ORIGIN_APPLIED : OFFER.ORIGIN_CONFIRMED,
      'buttonArchive': false
    };
    return {
      'handleTapItemOffer': () => {
        this.router.navigate(['/detail-offer', params]);
      }
    };
  }

}
