import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Offer } from '../../models/offer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORMREGEX } from 'src/app/regex/formRegex';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.page.html',
  styleUrls: ['./pay-modal.page.scss'],
})
export class PayModalPage implements OnInit {

  public offer: Offer;
  public reactiveForm: FormGroup;

  constructor(
    private modalController: ModalController, private navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.offer = this.navParams.get('offer');
  }

  ngOnInit() {
    this.reactiveForm = this.defineReactiveForm();
  }

  private defineReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'nameHolder': ['', [Validators.required]],
      'cardNumber': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cardNumber}`)]],
      'month': ['', [Validators.required, Validators.pattern(`${FORMREGEX.twoNumbers}`)]],
      'year': ['', [Validators.required, Validators.pattern(`${FORMREGEX.twoNumbers}`)]],
      'ccv': ['', [Validators.required, Validators.pattern(`${FORMREGEX.threeNumbers}`)]]
    });
  }

  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

  public handleClickPay(): void {
    
  }

}
