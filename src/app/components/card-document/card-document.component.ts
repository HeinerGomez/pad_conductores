import { Component, Input, OnInit } from '@angular/core';
import { CardDocument } from 'src/app/interfaces/own/cardDocument.interface';
import { CardDocumentOptions } from 'src/app/interfaces/own/cardDocumentOptions.interface';

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrls: ['./card-document.component.scss'],
})
export class CardDocumentComponent implements OnInit {

  @Input('cardDocument') public cardDocument: CardDocument;
  @Input('options') private options: CardDocumentOptions; 

  constructor() {}

  ngOnInit() {
    this.cardDocument.pathImageSticker = this.cardDocument.pathImageSticker == '' ? 'assets/imgs/img_placeholder_110_110.png' : this.cardDocument.pathImageSticker;
  }

   /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "lente - camara"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-22
   * @param void
   * @returns void
   */
  public handleTapCameraButton() {
    this.options.handleTapCameraButton(this.cardDocument);
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "imagen - picture"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-22
   * @param void
   * @returns void
   */
  public handleTapPictureButton() {
    this.options.handleTapPictureButton();
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "comentario - comment"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-22
   * @param void
   * @returns void
   */
  public handleTapCommentButton() {
    this.options.handleTapCommentButton();
  }

  /**
   * @description Tiene como objetivo manejar un posible error al momento de intentar de cargar una imagen
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-22
   * @param void
   * @returns void
   */
  public handleErrorLoadImage(event) {
    this.cardDocument.pathImageSticker = 'assets/imgs/img_placeholder_110_110.png';
  }

}
