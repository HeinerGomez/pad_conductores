import { Component, OnInit } from '@angular/core';
import { CardDocument } from '../interfaces/own/cardDocument.interface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DOCUMENT_STATUS } from '../data-simulation/data-document-status';
import { Platform } from '@ionic/angular';
import { BehaviorCardDocument } from '../interfaces/own/behaviorCardDocument.interface';
import { HandleGenericTapButtonForSideDocument } from '../interfaces/own/functions/handleGenericTapButtonForSideDocument.interface';

@Component({
  selector: 'app-document-bank',
  templateUrl: './document-bank.page.html',
  styleUrls: ['./document-bank.page.scss'],
})
export class DocumentBankPage implements OnInit {

  public cardDocuments: CardDocument[] = [];
  public behaviorCardDocument: BehaviorCardDocument;
  
  constructor(private camera: Camera, private platform: Platform) {}

  ngOnInit() {
    this.getDocumentList();
    this.behaviorCardDocument = this.defineBehaviorForCardDocument();
  }

  /**
   * @description Tiene como objetivo obtener la información relacionada al estado de documentos
   *              del banco de documentos
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns void
   */
  private getDocumentList(): void {
    this.cardDocuments = DOCUMENT_STATUS;
  }

  /**
   * @description Tiene como objetivo definir las opciones(handles) que implementara el componente "CardDocumentComponent"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns CardDocumentOptions
   */
  private defineBehaviorForCardDocument(): BehaviorCardDocument {
    const behavior: BehaviorCardDocument = {
      'handleTapButtonDetails': this.defineHandleTapButtonDetails()
    }
    return behavior;
  }

  /**
   * @description Tiene como objetivo definir el manejador destinado para redirigir a la vista de los sides de cada lado del documento
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns HandleGenericTapButtonForSideDocument
   */
  private defineHandleTapButtonDetails(): HandleGenericTapButtonForSideDocument {
    return (cardDocument: CardDocument) => {
      // const options: CameraOptions = {
      //   'quality': 100,
      //   'sourceType': this.camera.PictureSourceType.CAMERA,
      //   'encodingType': this.camera.EncodingType.JPEG,
      //   'destinationType': this.camera.DestinationType.DATA_URL,
      //   'saveToPhotoAlbum': false,
      //   'correctOrientation': true
      // }
      // this.camera.getPicture(options).then((imageData) => {
      //   cardDocument.pathImageSticker = 'data:image/jpeg;base64,' + imageData;
      // });
      console.log('Working ...');
    }
  }
}
