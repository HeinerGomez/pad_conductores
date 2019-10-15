import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.page.html',
  styleUrls: ['./pay-modal.page.scss'],
})
export class PayModalPage implements OnInit {

  

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

}
