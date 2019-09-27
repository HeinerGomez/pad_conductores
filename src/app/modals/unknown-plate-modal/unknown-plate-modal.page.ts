import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/api/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-unknown-plate-modal',
  templateUrl: './unknown-plate-modal.page.html',
  styleUrls: ['./unknown-plate-modal.page.scss'],
})
export class UnknownPlateModalPage implements OnInit {

  public user: User;

  constructor(
    private modalController: ModalController, private navParams: NavParams,
    private userService: UserService, private utilitiesService: UtilitiesService
  ) {
    this.user = this.navParams.get('user');
  }

  ngOnInit() {
  }

  /**
   * @description Tiene como objetivo cerrar el modal
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns void
   */
  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

  public handleTapUnknownPlate(): void {
    const data = {
      'documentNumber': this.user.documentNumber,
      'driverId': this.user.driverId
    };
    this.userService.sendUnknownPlate(data).subscribe(response => {
      console.log("Esta es la respuesta de esta no es mi placa", response);
      let mensaje = 'Se ha enviado una notificacion a la persona encargada.';
      if (response.hasOwnProperty('data')) {
        mensaje = response.data;
      }
      this.utilitiesService.showSnackbar(mensaje, 'success');
      this.modalController.dismiss();
    });
  }

}
