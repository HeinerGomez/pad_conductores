import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.page.html',
  styleUrls: ['./pay-modal.page.scss'],
})
export class PayModalPage implements OnInit {

  public offer: Offer;

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.offer = this.navParams.get('offer');
  }

  ngOnInit() {
  }

  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

}
