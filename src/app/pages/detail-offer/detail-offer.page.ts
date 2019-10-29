import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { OFFER } from '../../constants/offers.constants';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { RatingServiceCompanyModalPage } from '../../modals/rating-service-company-modal/rating-service-company-modal.page';
import { Offer } from 'src/app/models/offer';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { UserService } from '../../services/api/user.service';
import { User } from 'src/app/models/user';
import { GeolocationService } from '../../services/geolocation.service';
import { PayModalPage } from '../../modals/pay-modal/pay-modal.page';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.page.html',
  styleUrls: ['./detail-offer.page.scss'],
})
export class DetailOfferPage implements OnDestroy, AfterViewInit {

  public shouldShowButtonAcceptOffer: boolean;
  public shouldShowButtonCancelOffer: boolean; 
  public shouldShowButtonFulfilled: boolean;
  public shouldShowButtonServiceRating: boolean;
  public offer: Offer;
  private userBackendId: any;
  private user: User;

  constructor(
    private utilitiesService: UtilitiesService, private activatedRoute: ActivatedRoute, 
    private router: Router, private modalController: ModalController,
    private offerAPIService: OffersApiService, private navController: NavController,
    private userService: UserService, private geolocationService: GeolocationService,
    private actionSheetController: ActionSheetController, private utilsService: UtilitiesService
  ) {
    const params = this.offerAPIService.getData();
    console.log("Los params: ", params);
    this.shouldShowButtonAcceptOffer = OFFER.ORIGIN_AVAILABLE == params.options.origin ? true : false;
    this.shouldShowButtonCancelOffer = OFFER.ORIGIN_APPLIED == params.options.origin ? true : false;
    this.shouldShowButtonFulfilled = OFFER.ORIGIN_FULFILLED == params.options.origin ? true : false;
    this.shouldShowButtonServiceRating = OFFER.ORIGIN_CONFIRMED == params.options.origin ? true : false;
    this.offer = params.offer;
  }

  ngAfterViewInit() {
    console.warn("Obteniendo posicion ...");
    this.geolocationService.startObserverPosition();
  }

  async ionViewDidEnter() {
    this.userBackendId = await this.getIdUserBackendId();
    this.userService.getUserData(this.userBackendId).subscribe((user: User) => {
      this.user = user;
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

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en aceptar oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-18
   * @param void
   * @returns void
   */
  public handleTapAcceptOffer(): void {
    if (this.canContinue()) {
      const data = {
        "driver_id": this.user.driverId,
        "offer_id": this.offer.id,
        "vehicle_id": this.user.vehicleId,
        "offer_state_id": "2", // aplicado,
        "latitude": this.geolocationService.latitude,
        "longitude": this.geolocationService.longitude
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
    } else {
      this.utilitiesService.showInfoAlert('Oferta No Aplicada', 'Aun no eres un suscriptor activo');
    }
  }

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en cancelar oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapCancelOffer(): void {
    if (this.canContinue()) {
      const data = {
        "driver_id": this.user.driverId,
        "offer_id": this.offer.id,
        "vehicle_id": this.user.vehicleId,
        "offer_state_id": "3", // rechazar,
        "latitude": this.geolocationService.latitude,
        "longitude": this.geolocationService.longitude
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
    } else {
      this.utilitiesService.showInfoAlert('Oferta No Cancelada', 'Aun no eres un suscriptor activo');
    }
  }

  /**
   * @description Tiene como objetivo manejar la logica asociada a hacer click en cumplir oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapFulfilledOffer(): void {
    this.offerAPIService.setData(this.offer);
    this.navController.navigateForward('/fulfilled-offer');
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
      'componentProps': {
        'offerId': this.offer.id
      }
    });
    modal.present();
  }

  // para validar si puede aceptar/rechazar/cumplir/calificar una oferta
  private canContinue() {
    return this.user.subscriptionStatus;
  }

  public async handleClickFabActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      keyboardClose: false,
      buttons: [{
        text: 'Realizar Pago',
        icon: 'card',
        handler: async () => {
          if (this.offer.hasPay) {
            this.utilsService.showSnackbar('Ya hay un pago asociado', 'primary');
          } else {
            const modal = await this.modalController.create({
              'component': PayModalPage,
              'componentProps': {
                'offer': this.offer,
                'driverId': this.user.driverId
              }
            });
            modal.present();
          }
        }
      },{
        text: 'Descargar Certificado',
        icon: 'ribbon',
        handler: () => {
          if (this.offer.hasPay) {
            this.utilsService.showSnackbar('Commin soon', 'primary');
          } else {
            this.utilsService.showSnackbar('No se ha realizado el pago', 'primary');
          }
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  ngOnDestroy() {
    this.geolocationService.stopObserverPosition();
  }

}
