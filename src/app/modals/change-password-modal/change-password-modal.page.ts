import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.page.html',
  styleUrls: ['./change-password-modal.page.scss'],
})
export class ChangePasswordModalPage implements OnInit {

  public reactiveForm: FormGroup;
  public behaviorPasswords: any;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) {
    this.behaviorPasswords = {
      'iconNewPassword': 'eye',
      'iconNewPasswordRepeat': 'eye',
      'controlTypeNewPassword': 'password',
      'controlTypeNewPasswordRepeat': 'password',
    }
  }

  ngOnInit() {
    this.reactiveForm = this.buildReactiveForm();
  }

   /**
   * @description Tiene como objetivo cerrar el modal
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-27
   * @param void
   * @returns void
   */
  public async handleTapCloseButton() {
    this.modalController.dismiss();
  }

   /**
   * @description Tiene como objetivo construir el formulario reactivo
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-27
   * @param void
   * @returns void
   */
  private buildReactiveForm(): FormGroup {
    const reactiveForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'newPasswordRepeat': '',
      'securityQuestion': ['', Validators.required],
      'answerQuestion': ['', Validators.required]
    });
    reactiveForm.get('newPasswordRepeat').setValidators([
      this.validatePasswordMatch.bind(this)
    ]);
    return reactiveForm;
  }

  /**
   * @description Tiene como objetivo validar si las contraseñas coinciden
   * @date 2019-04-27
   * @param FormControl
   * @returns { [s: string]: boolean }
   */
  private validatePasswordMatch(control: FormControl): { [s: string]: boolean } {
    if (control.value != this.reactiveForm.get('newPassword').value) {
      return {
        'noPasswordMach': true
      };
    } else {
      return null;
    }
  }

   /**
   * @description Tiene como objetivo manejar los iconos y los tipos de datos de los campos de contraseña
   * @date 2019-04-27
   * @param FormControl
   * @returns { [s: string]: boolean }
   */
  public handleViewPassword(isForNewPasswordRepeat: boolean): void {
    if (isForNewPasswordRepeat) {
      this.behaviorPasswords.iconNewPasswordRepeat = this.behaviorPasswords.iconNewPasswordRepeat == 'eye' ? 'eye-off' : 'eye';
      this.behaviorPasswords.controlTypeNewPasswordRepeat = this.behaviorPasswords.controlTypeNewPasswordRepeat == 'password' ? 'text' : 'password';
    } else {
      this.behaviorPasswords.iconNewPassword = this.behaviorPasswords.iconNewPassword == 'eye' ? 'eye-off' : 'eye';
      this.behaviorPasswords.controlTypeNewPassword = this.behaviorPasswords.controlTypeNewPassword == 'password' ? 'text' : 'password';
    }
  }

}
