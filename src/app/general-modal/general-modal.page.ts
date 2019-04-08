import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ModalData } from '../interfaces/own/modalData.interface';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.page.html',
  styleUrls: ['./general-modal.page.scss'],
})
export class GeneralModalPage {

  public modalData: ModalData;

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.modalData = this.navParams.get('modalData');
  }

  /**
   * @description Tiene como objetivo ejecutar la accion del botton, definida dentro de los parametros
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-08
   * @param void
   * @returns void
   */
  public handleTapButtonOne(): void {
    this.modalData.buttonOne.handle();
  }

  /**
   * @description Tiene como objetivo ejecutar la accion del botton, definida dentro de los parametros
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-08
   * @param void
   * @returns void
   */
  public handleTapButtonTwo(): void {
    this.modalData.buttonTwo.handle();
  }

   /**
   * @description Tiene como objetivo ejecutar la accion del botton que cierra el modal
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-08
   * @param void
   * @returns void
   */
  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

}
