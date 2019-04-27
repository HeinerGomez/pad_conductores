import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalDataModalPage } from '../personal-data-modal/personal-data-modal.page';
import { AboutModalPage } from '../about-modal/about-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

   /**
   * @description Tiene como objetivo abrir el modal de los datos personales del conductor
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-26
   * @param void
   * @returns void
   */
  public async handleTapButtonPersonalData() {
    const modal = await this.modalController.create({
      'component': PersonalDataModalPage,
      'componentProps': {}
    });
    modal.present();
  }

  /**
   * @description Tiene como objetivo abrir el modal de los datos personales del conductor
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-26
   * @param void
   * @returns void
   */
  public async handleTapButtonAbout() {
    const modal = await this.modalController.create({
      'component': AboutModalPage,
      'componentProps': {}
    });
    modal.present();
  }

}
