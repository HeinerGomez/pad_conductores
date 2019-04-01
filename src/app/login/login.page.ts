import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public inputTypePassword: string;
  public iconTypePassword: string;
  public reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    this.router.navigate(['/offers']);
  }

}
