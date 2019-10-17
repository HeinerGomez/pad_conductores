import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/api/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.page.html',
  styleUrls: ['./change-password-modal.page.scss'],
})
export class ChangePasswordModalPage implements OnInit {

  public reactiveForm: FormGroup;
  public behaviorPasswords: any;
  public user: User;
  private userBackendId: any;
  public questions: Question[];
  public forgotPwd: boolean;
  public question: any;

  constructor(
    private modalController: ModalController, private formBuilder: FormBuilder,
    private navParams: NavParams, private userService: UserService,
    private utilsService: UtilitiesService
  ) {
    this.behaviorPasswords = {
      'iconNewPassword': 'eye',
      'iconNewPasswordRepeat': 'eye',
      'controlTypeNewPassword': 'password',
      'controlTypeNewPasswordRepeat': 'password',
    }
    this.user = this.navParams.get('user');
    this.userBackendId = this.navParams.get('userBackendId');
    this.forgotPwd = this.navParams.get('forgotPwd');
    this.question = this.user == null ? 0 : this.user.question;
    console.log("Esta es el usuario en mención: ", this.user, this.userBackendId);
  }

  ngOnInit() {
    this.getQuestions();
    this.reactiveForm = this.buildReactiveForm();
  }

  /**
   * 
   * 
   */
  private getQuestions(): void {
    this.userService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
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
      'newPassword': ['', [Validators.required, Validators.minLength(6)]],
      'newPasswordRepeat': ['', [Validators.required, Validators.minLength(6)]],
      'securityQuestion': ['', Validators.required],
      'answerQuestion': ['', Validators.required]
    });
    reactiveForm.get('newPasswordRepeat').setValidators([
      this.validatePasswordMatch.bind(this)
    ]);
    if (!this.forgotPwd) {
      reactiveForm.get('username').patchValue(this.user.documentNumber);
      reactiveForm.get('username').disable();
    }
    if (this.question != 0) {
      reactiveForm.get('securityQuestion').patchValue(this.question);
    } 
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

  /**
   * @description Tiene como objetivo enviar la peticion al backend para cambiar la contraseña
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns void
   */
  public handleClickChangePassword(): void {
    const data = this.reactiveForm.value;
    if (!this.forgotPwd) {
      this.userService.updateChangePassword(data, this.user, this.userBackendId).subscribe((response: any) => {
        // si llega hasta este punto, se asume que se actualizo exitosamente
        this.utilsService.showSnackbar('La información se ha actualizado exitosamente', 'success');
        this.modalController.dismiss();
      }, error => console.error(error));
    } else {
      this.userService.forgotPassword(data).subscribe((response: any) => {
        // si llega hasta este punto, se asume que se actualizo exitosamente
        this.utilsService.showSnackbar('La información se ha actualizado exitosamente', 'success');
        this.modalController.dismiss();
      }, error => console.error(error));
    }
  }

}
