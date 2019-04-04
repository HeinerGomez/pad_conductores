import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private alertController: AlertController, private toastController: ToastController,
              private loadingController: LoadingController) {}

  /**
   * @description Tiene como objetivo mostrar un alert avanzado
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param options: AlertOptions
   * @returns void
   */
  public async showAdvanceAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }

  /**
   * @description Tiene como objetivo mostrar un alert básico
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param title: string
   * @param message: string
   * @returns void
   */
  public async showInfoAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      'header': title,
      'message': message,
      'buttons': [
        {
          'text': 'Entendido',
          'role': 'cancel',
          'cssClass': 'secondary'
        }
      ]
    });
    await alert.present();
  }

  /**
   * @description Tiene como objetivo mostrar un snackbar básico
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param message: string
   * @returns void
   */
  public async showSnackbar(message: string) {
    const snackbar = await this.toastController.create({
      'message': message,
      'showCloseButton': true,
      'closeButtonText': '👏',
      'color': 'primary',
      'duration': 5000
    });
    await snackbar.present();
  }

  /**
   * @description Tiene como objetivo mostrar un loading
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param message: string
   * @returns void
   */
  public async showLoading(message: string) {
    const loading = await this.loadingController.create({
      'message': message,
    });
    loading.present();
  }

  /**
   * @description Tiene como objetivo cerrar un loading
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param void
   * @returns void
   */
  public async closeLoading() {
    this.loadingController.dismiss();
  }
}
