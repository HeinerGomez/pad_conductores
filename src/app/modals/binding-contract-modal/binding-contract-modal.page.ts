import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, IonSlides, MenuController, NavParams } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SideDocument } from 'src/app/models/side-document';
import { Document } from '../../models/document';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-binding-contract-modal',
  templateUrl: './binding-contract-modal.page.html',
  styleUrls: ['./binding-contract-modal.page.scss'],
})
export class BindingContractModalPage implements OnInit, AfterViewInit {

  @ViewChild('mySlider') public slides: IonSlides;
  public shouldDisableNextButton: boolean;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 0.5,
    'canvasWidth': 400,
    'canvasHeight': 200
  };

  public slideOptions: any;
  public cardDocument: Document;
  public sides: SideDocument[];
  public imagePlaceholder: string;

  constructor(
    private modalController: ModalController, private menuController: MenuController,
    private navParams: NavParams, private utilitiesService: UtilitiesService
  ) { 
    this.menuController.enable(false);
    this.shouldDisableNextButton = false;
    this.slideOptions = {
      'allowTouchMove': false,
      'autoHeight': true
    };
    this.cardDocument = this.navParams.get('cardDocument');
    this.sides = this.cardDocument.sides;
    this.imagePlaceholder = '';
    console.log("Estos son los sides: .... ", this.sides);
  }

  ngOnInit() {
    this.observerCurrentIndex();
  }

  ionViewWillEnter() {
    this.setImagePlaceholderIfNotImage();
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
  }

   /**
   * @description Tiene como objetivo establecer una imagen placeholder en caso de que los lados de los documentos, no
   *              tengan una imagen asociada
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-25
   * @param void
   * @returns void
   */
  private setImagePlaceholderIfNotImage(): void {
    for ( const side of this.sides ) {
      if (side.pathImage == '') {
        side.pathImage = this.imagePlaceholder;
      }
    }
  }

  private observerCurrentIndex(): void {
    this.slides.ionSlideDidChange.subscribe(() => {
      this.slides.getActiveIndex().then(index => {
        this.shouldDisableNextButton = index == 1 ? true : false;
      }).catch(error => console.error(error));
    });
  }

  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

  public next(): void {
    this.slides.slideNext()
    
  }

  public confirm(): void {
    const signatureImg = this.signaturePad.toDataURL();
    this.sides[0].pathImage = signatureImg;
    this.utilitiesService.showSnackbar('Firmado exitoso', 'success');
    this.handleTapCloseButton();
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
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento dar click al boton de "trash - basura", limpia la imagen registrada
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-30
   * @param void
   * @returns void
   */
  public handleTapClearImage(): void {
    this.imagePlaceholder = '';
    this.sides[0].pathImage = '';
  }

}
