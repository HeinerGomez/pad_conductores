import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORMREGEX } from '../regex/formRegex';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.reactiveForm = this.buildReactiveForm();
  }

  /**
   * @description Tiene como objetivo construir el formulario reactivo que va a tener esta pagina
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-04
   * @param void
   * @returns FormGroup
   */
  private buildReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'cardDocumentId': ['', [Validators.required, Validators.pattern(`${FORMREGEX.idCardCC}`)]],
      'fullName': ['', [Validators.required, Validators.pattern(`${FORMREGEX.textWithSpaces}`)]],
      'cellphone': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'whatsapp': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'email': ['', Validators.pattern(`${FORMREGEX.email}`)],
      'referralCode': ''
    });
  }

  /**
   * @description Tiene como objetivo manejar las acciones relacionadas con el botón continuar del registro
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-04
   * @param void
   * @returns void
   */
  public handleTapContinue(): void {
    console.log("Reactive Forms: ", this.reactiveForm);
    console.log("Identificacion: ", this.reactiveForm.get('cardDocumentId').hasError('required'));

  }

  /**
   * @description Tiene como objetivo replicar el telefono en el campo de whatsapp
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-04
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

}
