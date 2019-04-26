import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORMREGEX } from '../regex/formRegex';

@Component({
  selector: 'app-personal-data-modal',
  templateUrl: './personal-data-modal.page.html',
  styleUrls: ['./personal-data-modal.page.scss'],
})
export class PersonalDataModalPage implements OnInit {

  public reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.reactiveForm = this.defineReactiveForm();
  }

  private defineReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'names': ['', [Validators.required, Validators.pattern(`${FORMREGEX.textWithSpaces}`)]],
      'firstSurname': ['', [Validators.required]],
      'secondSurname': '',
      'cellphone': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'whatsapp': ['', [Validators.required, Validators.pattern(`${FORMREGEX.cellPhone}`)]],
      'email': ['', Validators.pattern(`${FORMREGEX.email}`)]
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

}
