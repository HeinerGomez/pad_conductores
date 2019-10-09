import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInSession } from '../../interfaces/own/userInSession.interf';
import { AuthService } from '../../services/auth.service';
import { AuthService as AuthSca } from '../../services/auth/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { NavController, ModalController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/api/user.service';
import { ChangePasswordModalPage } from '../../modals/change-password-modal/change-password-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public inputTypePassword: string;
  public iconTypePassword: string;
  public reactiveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private navController: NavController,
    private authService: AuthService, private utilitiesService: UtilitiesService,
    private _authService: AuthSca, private userService: UserService, 
    private modalController: ModalController
  ) {
    this.inputTypePassword = 'password';
    this.iconTypePassword = 'eye';
    this.reactiveForm = this.buildReactiveForm();
  }

  ionViewDidEnter() {
    const _userAndPwd = localStorage.getItem('userAndPwd');
    console.log("Este es el user en session: ", _userAndPwd);
    if (_userAndPwd) {
      const userAndPwd = JSON.parse(_userAndPwd);
      console.log("Este es el user en session 2: ", userAndPwd);
      this.fillReactiveFormAndLogin(userAndPwd);
    }
  }

  private fillReactiveFormAndLogin(userAndPwd: any) {
    this.reactiveForm.patchValue({
      'username': userAndPwd.user,
      'password': userAndPwd.pwd
    });
    this.handleTapButtonLogin();
  }

  /**
   * @description Tiene como objetivo cambiar el tipo de input y el icono al campo de contraseña, según si se quiere o no 
   *              mostrar la información
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param void
   * @returns void
   */
  public handleTapIconPassword(): void {
    this.inputTypePassword = (this.inputTypePassword === 'text' ? 'password' : 'text');
    this.iconTypePassword = (this.inputTypePassword === 'text' ? 'eye-off' : 'eye');
  }

  /**
   * @description Tiene como objetivo construir el formulario reactivo que va a tener esta pagina
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param void
   * @returns FormGroup
   */
  private buildReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  /**
   * @description Tiene como objetivo manejar el evento en el que se le da click/tap en el botón de login
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param void
   * @returns void
   */
  public handleTapButtonLogin(): void {
    // cargo de manera temporal un usuario ficticio
    // const user: UserInSession = {
    //   'username': 'Ero-sennin',
    //   'realName': 'Heiner',
    //   'firstLastName': 'Gómez',
    //   'cellPhoneNumber': '3007045868'
    // };
    // this.authService.Authenticate(user).then( () => {
    //   this.utilitiesService.showLoading('Iniciando sesión');
    //   setTimeout( () => {
    //     this.utilitiesService.closeLoading();
    //     this.navController.navigateRoot('tab-offers');
    //   }, 3000)
    // }).catch(error => {
    //   console.error('Error en handleTapButtonLogin: ', error);
    //   this.utilitiesService.showSnackbar('Error al intentar iniciar sesión');
    // });
    const { username, password } = this.reactiveForm.value;
    this.utilitiesService.showLoading('Iniciando sesión');
    this._authService.login(username, password).pipe(first()).subscribe((response: any) => {
      this.navController.navigateRoot('tab-offers');
      this.utilitiesService.closeLoading();
    }, error => this.utilitiesService.closeLoading());
  }

  public async handleForgotPassword() {
    const modal = await this.modalController.create({
      'component': ChangePasswordModalPage,
      'componentProps': {
        'user': null,
        'userBackendId': null, 
        'forgotPwd': true
      }
    });
    modal.present();
  }

}
