import { Component, OnInit } from '@angular/core';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from '../../constants/offers.constants';
import { Router } from '@angular/router';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { Offer } from 'src/app/models/offer';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-rating-service-company',
  templateUrl: './rating-service-company.page.html',
  styleUrls: ['./rating-service-company.page.scss'],
})
export class RatingServiceCompanyPage implements OnInit {

  public offersPerQualification: Offer[];
  public itemOptions: ItemOfferOptions;
  private userBackendId: any;
  private user: User;

  constructor(
    private router: Router,
    private navController: NavController,
    private offersAPIService: OffersApiService, 
    private userService: UserService
  ) {
    this.itemOptions = this.defineItemOptions();
    this.offersPerQualification = [];
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.userBackendId = await this.getIdUserBackendId();
    this.userService.getUserData(this.userBackendId).subscribe((user: User) => {
      this.user = user;
      this.getOffersPerQualification();
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

  private getOffersPerQualification() {
    const driverId = this.user.driverId; // temporal
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
        this.offersAPIService.setData(_params);
        this.navController.navigateForward('/detail-offer');
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
