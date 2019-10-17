import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FORMREGEX } from '../../regex/formRegex';
import { NavController } from '@ionic/angular';
import { RegisterApiService } from 'src/app/services/api/register-api.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public reactiveForm: FormGroup;
  public questions: Question[];

  constructor(
    private formBuilder: FormBuilder, private navController: NavController,
    private registerAPIService: RegisterApiService
  ) { 
    this.reactiveForm = this.buildReactiveForm();
  }

  ngOnInit() {
    // obtengo las dependencias
    this.getDependencies();
  }

  private getDependencies() {
    this.registerAPIService.getDependencies().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }

  /**
   * @description Tiene como objetivo construir el formulario reactivo que va a tener esta pagina
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-04
   * @param void
   * @returns FormGroup
   */
  private buildReactiveForm(): FormGroup {
    const reactiveForm = this.formBuilder.group({
      'cardDocumentId': ['', [Validators.required, Validators.pattern(`${FORMREGEX.idCardCC}`)]],
      'fullName': ['', [Validators.required, Validators.pattern(`${FORMREGEX.textWithSpaces}`)]],
      'cellphone': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'whatsapp': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'email': ['', [Validators.required, Validators.pattern(`${FORMREGEX.email}`)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'repeatPassword': ['', [Validators.required, Validators.minLength(6)]],
      'securityQuestion': ['', [Validators.required]],
      'answerSecurityQuestion': ['', [Validators.required]],
      'referralCode': ''
    });
    reactiveForm.get('repeatPassword').setValidators([
      this.validatePasswordMatch.bind(this)
    ]);
    return reactiveForm;
  }
  
  /**
   * @description Tiene como objetivo validar si las contraseñas coinciden
   * @param FormControl
   * @returns { [s: string]: boolean }
   */
  private validatePasswordMatch(control: FormControl): { [s: string]: boolean } {
    if (control.value != this.reactiveForm.get('password').value) {
      return {
        'noPasswordMach': true
      };
    } else {
      return null;
    }
  }

  /**
   * @description Tiene como objetivo manejar las acciones relacionadas con el botón continuar del registro
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-04
   * @param void
   * @returns void
   */
  public handleTapContinue(): void {
    const data = this.reactiveForm.value;
    this.navController.navigateForward(['/vehicle-association'], {queryParams: {... data}});
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
