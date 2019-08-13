import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FORMREGEX } from '../../regex/formRegex';
import { ModalController, NavController } from '@ionic/angular';
import { GeneralModalPage } from '../..//modals/general-modal/general-modal.page';
import { ModalData } from '../../interfaces/own/modalData.interface';
import { ButtonData } from '../../interfaces/own/buttonData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-association',
  templateUrl: './vehicle-association.page.html',
  styleUrls: ['./vehicle-association.page.scss'],
})
export class VehicleAssociationPage {

  public reactiveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private modalController: ModalController, 
    private navController: NavController
  ) {
    this.reactiveForm = this.buildReactiveForm();
  }
  
  /**
   * @description Tiene como objetivo construir el formulario reactivo que va a tener esta pagina
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-05
   * @param void
   * @returns FormGroup
   */
  private buildReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'licensePlate': ['', [Validators.required, Validators.pattern(`${FORMREGEX.licensePlate}`)]],
      'modelYear': ['', [Validators.required, Validators.pattern(`${FORMREGEX.year}`)]],
      'vehicleConfiguration': ['', Validators.required]
    });
  }

  /**
   * @description Tiene como objetivo pasar la placa digitada a mayusculas
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-05
   * @param void
   * @returns void
   */
  public handleChangeLicensePlate(): void {
    let licensePlate: String = this.reactiveForm.get('licensePlate').value;
    if (licensePlate.length) {
      let upperLicensePlate = licensePlate.toUpperCase();
      this.reactiveForm.patchValue({
        'licensePlate': upperLicensePlate
      });
    }
  }

  /**
   * @description Tiene como objetivo manejar la logica del botón de continuar
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-05
   * @param void
   * @returns void
   */
  public handleTapContinue(): void {
    this.openGeneralModal();
  }

  /**
   * @description Tiene como objetivo abrir un modal con el cartel de registro exitoso
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-08
   * @param void
   * @returns void
   */
  private async openGeneralModal() {
    const buttonOne: ButtonData = {
      'text': 'Entendido',
      'fill': 'outline',
      'expand': 'block',
      'color': 'secondary',
      'handle': () => {
        this.modalController.dismiss().then( () => {
          this.navController.navigateRoot('/home');
        });
      }
    };
    const modalData: ModalData = {
      'closeButton': false,
      'pathImage': 'assets/imgs/email.svg',
      'title': 'Registro Exítoso',
      'textOne': `Hemos completado el registro de forma exítosa 😃, ten en cuenta que más adelante se necesitarán 
                  tus documentos y los del vehiculo.`,
      'textTwo': `Si has registrado un correo electrónico, revisalo!, te hemos enviado tus accesos y el listado de 
                  documentos que debes tener en cuenta!`,
      'buttonOne': buttonOne
    };
    const generalModal = await this.modalController.create({
      'component': GeneralModalPage,
      'componentProps': {
        'modalData': modalData
      }
    });
    await generalModal.present();
  }

}
