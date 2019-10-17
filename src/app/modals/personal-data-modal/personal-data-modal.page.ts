import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORMREGEX } from '../../regex/formRegex';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { User } from '../../models/user';
import { UserService } from '../../services/api/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-personal-data-modal',
  templateUrl: './personal-data-modal.page.html',
  styleUrls: ['./personal-data-modal.page.scss'],
})
export class PersonalDataModalPage implements OnInit {

  public reactiveForm: FormGroup;
  private user: User;
  private userBackendId: any;

  constructor(
    private formBuilder: FormBuilder, private modalController: ModalController,
    private navParams: NavParams, private userService: UserService, 
    private utilsService: UtilitiesService
  ) {
    this.user = this.navParams.get('user');
    this.userBackendId = this.navParams.get('userBackendId');
    console.log("Esta es el usuario en mención: ", this.user, this.userBackendId);
  }

  ngOnInit() {
    this.reactiveForm = this.defineReactiveForm();
  }

  /**
   * @description Tiene como objetivo definir el formulario reactivo que se va a utilizar
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-26
   * @param void
   * @returns FormGroup
   */
  private defineReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'names': [this.user.name, [Validators.required, Validators.pattern(`${FORMREGEX.textWithSpaces}`)]],
      'cellphone': [this.user.cellphone, [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'whatsapp': [this.user.whatsapp, [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'email': [{value: this.user.email, disabled: true}, Validators.pattern(`${FORMREGEX.email}`)]
    });
  }

    /**
   * @description Tiene como objetivo replicar el telefono en el campo de whatsapp
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-26
   * @param void
   * @returns void
   */
  public handleChangeCellphone(): void {
    let cellphone = this.reactiveForm.get('cellphone').value;
    if (cellphone !== null) {
      cellphone = cellphone.toString();
      let whatsappNumber = this.reactiveForm.get('whatsapp').value;
      if (cellphone.startsWith(whatsappNumber) || whatsappNumber == "") {
        whatsappNumber = cellphone;
        this.reactiveForm.patchValue({
          'whatsapp': whatsappNumber
        });
      } 
    }
  }

   /**
   * @description Tiene como objetivo cerrar el modal
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-26
   * @param void
   * @returns void
   */
  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

  /**
   * @description Tiene como objetivo enviar la peticion al backend para cambiar la info
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns void
   */
  public handleClickChangePersonalData(): void {
    const data = this.reactiveForm.value;
    this.userService.updatePersonalData(data, this.user, this.userBackendId).subscribe((response: any) => {
      // si llega hasta este punto, se asume que se actualizo exitosamente
      this.utilsService.showSnackbar('La información se ha actualizado exitosamente', 'success');
      this.modalController.dismiss();
    }, error => console.error(error));
  }

}
