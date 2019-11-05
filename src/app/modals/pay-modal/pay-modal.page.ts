import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Offer } from '../../models/offer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORMREGEX } from 'src/app/regex/formRegex';
import { PayOfferOutput } from '../../converts/outputs/pay-offer-output.convert';
import { CryptoVigenereService } from '../../services/crypto-vigenere.service';
import { OffersApiService } from '../../services/api/offers-api.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.page.html',
  styleUrls: ['./pay-modal.page.scss'],
})
export class PayModalPage implements OnInit {

  public offer: Offer;
  private driverId: number;
  public reactiveForm: FormGroup;

  constructor(
    private modalController: ModalController, private navParams: NavParams,
    private formBuilder: FormBuilder, private cryptoVigenereService: CryptoVigenereService,
    private offersApiService: OffersApiService, private utilitiesService: UtilitiesService,
    private navController: NavController
  ) {
    this.offer = this.navParams.get('offer');
    this.driverId = this.navParams.get('driverId');
  }

  ngOnInit() {
    this.reactiveForm = this.defineReactiveForm();
  }

  private defineReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'nameHolder': ['', [Validators.required]],
      'cardNumber': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cardNumber}`)]],
      'documentNumber': ['1032481733', [Validators.required]],
      'month': ['', [Validators.required]],
      'year': ['', [Validators.required]],
      'ccv': ['', [Validators.required, Validators.pattern(`${FORMREGEX.threeNumbers}`)]]
    });
  }

  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

  public handleClickPay(): void {
    const formData = this.reactiveForm.value;
    const data = {
      ... formData,
      'driverId': this.driverId,
      'offerId': this.offer.id
    };
    const payOfferOuput = new PayOfferOutput(this.cryptoVigenereService);
    const dataForRequest = payOfferOuput.convertPayOfferForRequestAPI(data);
    this.offersApiService.sendPay(dataForRequest).subscribe(response => {
      this.utilitiesService.showSnackbar('Pago realizado con exito', 'success');
      this.modalController.dismiss().then(() => {
        this.navController.navigateBack('tab-offers/tabs/my-offers');
      });
    });
  }
}
