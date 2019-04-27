import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.page.html',
  styleUrls: ['./about-modal.page.scss'],
})
export class AboutModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

   /**
   * @description Tiene como objetivo cerrar el modal
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-27
   * @param void
   * @returns void
   */
  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

}
