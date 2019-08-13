import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInSession } from '../../interfaces/own/userInSession.interf';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public inputTypePassword: string;
  public iconTypePassword: string;
  public reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private navController: NavController,
              private authService: AuthService, private utilitiesService: UtilitiesService) {
    this.inputTypePassword = 'password';
    this.iconTypePassword = 'eye';
    this.reactiveForm = this.buildReactiveForm();
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
    const user: UserInSession = {
      'username': 'Ero-sennin',
      'realName': 'Heiner',
      'firstLastName': 'Gómez',
      'cellPhoneNumber': '3007045868'
    };
    this.authService.Authenticate(user).then( () => {
      this.utilitiesService.showLoading('Iniciando sesión');
      setTimeout( () => {
        this.utilitiesService.closeLoading();
        this.navController.navigateRoot('tab-offers');
      }, 3000)
    }).catch(error => {
      console.error('Error en handleTapButtonLogin: ', error);
      this.utilitiesService.showSnackbar('Error al intentar iniciar sesión');
    });
  }
}
