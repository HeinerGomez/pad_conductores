import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Document } from 'src/app/models/document';
import { BehaviorCardDocument } from 'src/app/interfaces/own/behaviorCardDocument.interface';

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrls: ['./card-document.component.scss'],
})
export class CardDocumentComponent implements OnInit {

  @Input('cardDocument') public cardDocument: Document;
  @Input('behavior') private behavior: BehaviorCardDocument;
  private imgPlaceholder: string;
  private imgPlaceholderSide: string;

  constructor() {
    this.imgPlaceholder = 'assets/imgs/img_placeholder_110_110.png';
    this.imgPlaceholderSide = '../assets/imgs/img_placeholder_400_300.png';
  }

  ngOnInit() {
    this.setImagePlaceholderIfNotImage();
  }

  ionViewWillEnter() {
    this.setImagePlaceholderIfNotImage();
  }

  /**
   * @description Tiene como objetivo establecer una imagen placeholder en caso de que no se halla cargado ninguna imagen
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-25
   * @param void
   * @returns void
   */
  private setImagePlaceholderIfNotImage(): void {
    for(const side of this.cardDocument.sides) {
      if (side.pathImage != '' && side.pathImage != this.imgPlaceholderSide) {
        this.cardDocument.pathImageSticker = side.pathImage;
        break;
      } else {
        this.cardDocument.pathImageSticker = this.imgPlaceholder;
      }
    }
  }
 
  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "detalles"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-24
   * @param void
   * @returns void
   */
  public handleTapDetailsButton() {
    this.behavior.handleTapDetailsButton(this.cardDocument).then((modal: HTMLIonModalElement) => {
      modal.present();
      // estoy atento de cuando se cierre el modal
      modal.onDidDismiss().then(() => {
        this.setImagePlaceholderIfNotImage();
      });
    });
  }

  /**
   * @description Tiene como objetivo manejar un posible error al momento de intentar de cargar una imagen
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-22
   * @param void
   * @returns void
   */
  public handleErrorLoadImage(event): void {
    this.cardDocument.pathImageSticker = this.imgPlaceholder;
  }

}
