import { Component, OnInit } from '@angular/core';
import { CardDocument } from '../interfaces/own/cardDocument.interface';
import { CardDocumentOptions } from '../interfaces/own/cardDocumentOptions.interface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DOCUMENT_STATUS } from '../data-simulation/data-document-status';
import { HandleTapCameraButtonForCardDocument } from '../interfaces/own/functions/handleTapCameraButtonForCardDocument.interface';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-document-bank',
  templateUrl: './document-bank.page.html',
  styleUrls: ['./document-bank.page.scss'],
})
export class DocumentBankPage implements OnInit {

  public cardDocuments: CardDocument[] = [];
  public options: CardDocumentOptions;

  constructor(private camera: Camera, private platform: Platform) {
    
   
  }

  ngOnInit() {
    this.getDocumentList();
    this.options = this.defineOptionsForCardDocument();
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
  private defineOptionsForCardDocument(): CardDocumentOptions {
    const options: CardDocumentOptions = {
      'handleTapCameraButton': this.defineHandleTapCameraButton(), 
      'handleTapCommentButton': () => {},
      'handleTapPictureButton': () => {}
    }
    return options;
  }

  /**
   * @description Tiene como objetivo definir el manejador destinado para tomar la foto a un determinado documento
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns HandleTapCameraButtonForCardDocument
   */
  private defineHandleTapCameraButton(): HandleTapCameraButtonForCardDocument {
    return (cardDocument: CardDocument) => {
      // cardDocument.pathImageSticker = 'assets/imgs/cam_placeholder.png'
      const options: CameraOptions = {
        'quality': 100,
        'sourceType': this.camera.PictureSourceType.CAMERA,
        'encodingType': this.camera.EncodingType.JPEG,
        'destinationType': this.camera.DestinationType.DATA_URL,
        'saveToPhotoAlbum': false,
        'correctOrientation': true
      }
      this.camera.getPicture(options).then((imageData) => {
        cardDocument.pathImageSticker = 'data:image/jpeg;base64,' + imageData;
      });
    }
  }
}
