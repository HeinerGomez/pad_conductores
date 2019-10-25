import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, NavController } from '@ionic/angular';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { Router } from '@angular/router';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from '../../constants/offers.constants';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { Offer } from 'src/app/models/offer';
import { DynamicBadgeService } from 'src/app/services/dynamic-badge.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
})
export class MyOffersPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  public shouldShowOffersApplied: boolean;
  public shouldShowOffersConfirmed: boolean;
  public offersApplied: Offer[] = []; 
  public offersConfirmed: Offer[] = [];
  public itemOptions: ItemOfferOptions;
  private userBackendId: any;
  public user: User;

  constructor(
    private router: Router, private offersAPIService: OffersApiService,
    private navController: NavController, private dynamicBadgesService: DynamicBadgeService,
    private userService: UserService,
    ) { 
    this.shouldShowOffersApplied = true;
    this.shouldShowOffersConfirmed = false;
    this.itemOptions = this.defineItemOptions();
    
  }

  ngOnInit() {
    this.segment.value = 'applied';
  }

  async ionViewDidEnter() {
    this.userBackendId = await this.getIdUserBackendId();
    this.userService.getUserData(this.userBackendId).subscribe((user: User) => {
      this.user = user;
      this.getOffersApplied();
      this.getOffersConfirmed();
    });
  }

   /**
   * @description Tiene como objetivo obtener el id del usuario del backend pad, en base al
   * id del usuario creado en el sca
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns id: Number
   */
  private async getIdUserBackendId() {
    const user: any = localStorage.getItem('user');
    let _user = JSON.parse(user);
    return await this.userService.getSubscribe(_user.id).toPromise();
  }

  private getOffersApplied(): void {
    const driverId = this.user.driverId; // temporal
    this.offersAPIService.getOffersApplied(driverId).subscribe((offers: Offer[]) => { 
      this.offersApplied = offers
      this.dynamicBadgesService.badgeMyOffers = offers.length;
    });
  }

  private getOffersConfirmed(): void {
    const driverId = this.user.driverId; // temporal
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
    console.warn("SegmentValue: ", segmentValue);
    if (segmentValue == 'applied') {
      this.shouldShowOffersApplied = true;
      this.shouldShowOffersConfirmed = false;
      this.getOffersApplied();
    } else {
      this.shouldShowOffersApplied = false;
      this.shouldShowOffersConfirmed = true;
      this.getOffersConfirmed();
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
      this.getOffersApplied();
      this.getOffersConfirmed();
      event.target.complete();
    }, 1500);
  }

  /**
   * @description Tiene como objetivo definir las opciones(opciones, funciones), que tienen asociados al componente "ItemOffer"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param event
   * @returns void
   */
  private defineItemOptions(): ItemOfferOptions {
    console.warn('Should Offers Applied: ', this.shouldShowOffersApplied)
    const params: ParamsOfDetailOffer = {
      'origin': this.shouldShowOffersApplied === true ? OFFER.ORIGIN_APPLIED : OFFER.ORIGIN_FULFILLED,
      'buttonArchive': false,
    };
    return {
      'handleTapItemOffer': (offer: Offer) => {
        const _params = { options: params, offer }
        this.offersAPIService.setData(_params);
        this.navController.navigateForward('/detail-offer');
      },
      'buttonArchive': false,
      'hasChip': false
    };
  }

}
