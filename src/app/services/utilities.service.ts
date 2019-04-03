import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  private loading: Promise<HTMLIonLoadingElement>;

  constructor(private alertController: AlertController, private toastController: ToastController,
              private loadingController: LoadingController) {
    this.loading = null;
  }

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
      'duration': 10000
    });
    await snackbar.present();
  }

  /**
   * @description Tiene como objetivo generar una instancia del componente loading
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-03
   * @param message: string
   * @param shouldShow: boolean
   * @returns void
   */
  public async shouldShow(message: string) {
    return await this.loadingController.create({
      'message': message,
    });
  }
}
