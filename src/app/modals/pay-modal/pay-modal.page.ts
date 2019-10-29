import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Offer } from '../../models/offer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORMREGEX } from 'src/app/regex/formRegex';
import { PayOfferOutput } from '../../converts/outputs/pay-offer-output.convert';
import { CryptoVigenereService } from '../../services/crypto-vigenere.service';

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
    private formBuilder: FormBuilder, private cryptoVigenereService: CryptoVigenereService
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
      'month': ['', [Validators.required, Validators.pattern(`${FORMREGEX.twoNumbers}`)]],
      'year': ['', [Validators.required, Validators.pattern(`${FORMREGEX.twoNumbers}`)]],
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
      'driverId': this.driverId
    };
    const payOfferOuput = new PayOfferOutput(this.cryptoVigenereService);
    payOfferOuput.convertPayOfferForRequestAPI(data);
  }

}
