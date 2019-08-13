import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CardDocument } from '../../interfaces/own/cardDocument.interface';
import { BehaviorSideDocument } from '../../interfaces/own/behaviorSideDocument.interface';
import { SideDocument } from '../../interfaces/own/sideDocument.interface';

@Component({
  selector: 'app-sides-document-modal',
  templateUrl: './sides-document-modal.page.html',
  styleUrls: ['./sides-document-modal.page.scss'],
})
export class SidesDocumentModalPage implements OnInit {

  public cardDocument: CardDocument;
  public sides: SideDocument[];
  public behavior: BehaviorSideDocument;
  public imagePlaceholder: String;


  constructor(private navParams: NavParams) {
    this.imagePlaceholder = '../assets/imgs/img_placeholder_400_300.png';
    this.cardDocument = this.navParams.get('cardDocument');
    this.behavior = this.navParams.get('behavior');
    this.sides = this.cardDocument.sides;
  }

  ngOnInit() {
    this.setImagePlaceholderIfNotImage();
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

   /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "lente - camara"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns void
   */
  public handleTapCameraButton(side: SideDocument): void {
    this.behavior.handleTapCameraButton(side);
  }

   /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "galeria"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-25
   * @param void
   * @returns void
   */
  public handleTapGaleryButton(side: SideDocument): void {
    this.behavior.handleTapGaleryButton(side);
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de hacer click en el boton de "comentarios"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-25
   * @param void
   * @returns void
   */
  public handleTapCommentButton(side: SideDocument): void {
    this.behavior.handleTapCommentButton(side);
  }


}
