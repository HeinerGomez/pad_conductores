import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PersonalDataModalPage } from '../../modals/personal-data-modal/personal-data-modal.page';
import { AboutModalPage } from '../../modals/about-modal/about-modal.page';
import { ChangePasswordModalPage } from '../../modals/change-password-modal/change-password-modal.page';
import { UserService } from 'src/app/services/api/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  private userBackendId: any;
  public user: User;

  constructor(
    private modalController: ModalController, private userService: UserService
  ) {
    this.userBackendId = 0;
  }

  async ionViewDidEnter() {
    this.userBackendId = await this.getIdUserSca();
    // extraigo todos los datos del usuario
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
  private async getIdUserSca() {
    const user: any = localStorage.getItem('user');
    let _user = JSON.parse(user);
    return await this.userService.getSubscribe(_user.id).toPromise();
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
      'componentProps': {
        'user': this.user,
        'userBackendId': this.userBackendId
      }
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

  /**
   * @description Tiene como objetivo abrir el modal para el cambio de contraseña
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-27
   * @param void
   * @returns void
   */
  public async handleTapButtonChangePassword() {
    const modal = await this.modalController.create({
      'component': ChangePasswordModalPage,
      'componentProps': {
        'user': this.user,
        'userBackendId': this.userBackendId
      }
    });
    modal.present();
  }

}
