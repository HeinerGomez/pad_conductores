import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FORMREGEX } from '../regex/formRegex';

@Component({
  selector: 'app-vehicle-association',
  templateUrl: './vehicle-association.page.html',
  styleUrls: ['./vehicle-association.page.scss'],
})
export class VehicleAssociationPage {

  public reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    console.log('Working');
  }

}
