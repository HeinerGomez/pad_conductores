import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MenuController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UtilitiesService } from '../../services/utilities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Offer } from 'src/app/models/offer';
import { OffersApiService } from 'src/app/services/api/offers-api.service';

@Component({
  selector: 'app-fulfilled-offer',
  templateUrl: './fulfilled-offer.page.html',
  styleUrls: ['./fulfilled-offer.page.scss'],
})
export class FulfilledOfferPage implements OnInit, AfterViewInit {

  public reactiveForm: FormGroup;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 0.5,
    'canvasWidth': 400,
    'canvasHeight': 250
  };
  public imagePlaceholder: String;
  private offer: Offer;

  constructor(
    private menuController: MenuController, private camera: Camera, 
    private utilitiesServices: UtilitiesService, private router: Router, 
    private formBuilder: FormBuilder, public activatedRoute: ActivatedRoute, 
    private offersAPIService: OffersApiService
  ) {
    this.menuController.enable(false);
    this.imagePlaceholder = 'assets/imgs/img_placeholder_110_110.png';
    this.reactiveForm = this.formBuilder.group({
      'observations': ['', [Validators.required]]
    });
    const offer = this.offersAPIService.getData() as Offer;
    this.offer = Object.assign(new Offer(), offer);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
  }
  
  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al terminar de dibujar
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleDrawComplete(): void {
    // TODO
  }
  
   /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al empezar a dibujar
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleStartDraw(): void {
    console.log('begin drawing');
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento dar click al boton de "trash - basura", limpia la firma registrada
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapClearSignature(): void {
    this.signaturePad.clear(); 
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento dar click a la imagen placeholder o photo
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-02
   * @param void
   * @returns void
   */
  public handleTapCamera(): void {
    const options: CameraOptions = {
      'destinationType': this.camera.DestinationType.DATA_URL,
      'quality': 40,
      'encodingType': this.camera.EncodingType.JPEG,
    };
    this.camera.getPicture(options).then( imageData => {
      this.imagePlaceholder = 'data:image/jpeg;base64,' + imageData;
    });
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento dar click en el botón de cumplido
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-02
   * @param void
   * @returns void
   */
  public handleTapButtonFulfilled(): void {
    const data = {
      'data': [
        {
          "route": this.imagePlaceholder,
          "observation": this.reactiveForm.get('observations').value,
          "offer_id": this.offer.id,
          "signature": this.signaturePad.toDataURL()
        }
      ]
    };
    this.utilitiesServices.showLoading('Realizando el cumplido');
    this.offersAPIService.fullfilledOffer(data).subscribe(response => {
      this.utilitiesServices.closeLoading();
      this.utilitiesServices.showInfoAlert('Cumplido', 'Se ha realizado el cumplido exitosamente').then(() => {
        this.router.navigate(['/tab-offers/tabs/my-offers']).then(() => {
          this.menuController.enable(true);
        });
      });
    }, error => {
      this.utilitiesServices.closeLoading();
    });
  }

}
