import { Component, OnInit } from '@angular/core';
import { CardDocument } from '../../interfaces/own/cardDocument.interface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DOCUMENT_STATUS } from '../../data-simulation/data-document-status';
import { Platform, ModalController } from '@ionic/angular';
import { BehaviorCardDocument } from '../../interfaces/own/behaviorCardDocument.interface';
import { SidesDocumentModalPage } from '../../modals/sides-document-modal/sides-document-modal.page';
import { HandleGenericTabButtonFotCardDocument } from '../../interfaces/own/functions/handleGenericTapButtonForCardDocument.interface';
import { BehaviorSideDocument } from '../../interfaces/own/behaviorSideDocument.interface';
import { HandleGenericTapButtonForSideDocument } from '../../interfaces/own/functions/handleGenericTapButtonForSideDocument.interface';
import { SideDocument } from '../../interfaces/own/sideDocument.interface';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-document-bank',
  templateUrl: './document-bank.page.html',
  styleUrls: ['./document-bank.page.scss'],
})
export class DocumentBankPage implements OnInit {

  public cardDocuments: CardDocument[] = [];
  public behaviorCardDocument: BehaviorCardDocument;
  
  constructor(private camera: Camera, private platform: Platform,
              private modalController: ModalController, private utilitiesService: UtilitiesService) {}

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
      'handleTapDetailsButton': this.defineHandleTapDetailsButton()
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
  private defineHandleTapDetailsButton(): HandleGenericTabButtonFotCardDocument {
    return (cardDocument: CardDocument) => {
      const behavior: BehaviorSideDocument = {
        'handleTapCameraButton': this.defineHandleTapButtonCamera(),
        'handleTapGaleryButton': this.defineHandleTapButtonGalery(),
        'handleTapCommentButton': this.defineHandleTapButtonComments()
      };
     
      const sidesDocumentModal = this.modalController.create({
        'component': SidesDocumentModalPage,
        'componentProps': {
          'cardDocument': cardDocument,
          'behavior': behavior
        }
      });
      return sidesDocumentModal;
    }
  }

  /**
   * @description Tiene como objetivo definir el manejador destinado para tomar la foto a un documento
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns HandleGenericTapButtonForSideDocument
   */
  private defineHandleTapButtonCamera(): HandleGenericTapButtonForSideDocument {
    return (side: SideDocument) => {
      const cameraDirection = side.documentName == 'Foto Rostro' ? this.camera.Direction.FRONT : this.camera.Direction.BACK;
      console.log('Camera Direction: ', cameraDirection);
      const options: CameraOptions = {
        'quality': 40,
        'sourceType': this.camera.PictureSourceType.CAMERA,
        'encodingType': this.camera.EncodingType.JPEG,
        'destinationType': this.camera.DestinationType.DATA_URL,
        'saveToPhotoAlbum': false,
        'correctOrientation': false,
        'cameraDirection': this.camera.Direction.BACK
      }
      this.camera.getPicture(options).then( imageData => {
        side.pathImage = 'data:image/jpeg;base64,' + imageData;
      });
    }
  }

  /**
   * @description Tiene como objetivo definir el manejador destinado para seleccionar una foto de la galeria
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns HandleGenericTapButtonForSideDocument
   */
  private defineHandleTapButtonGalery(): HandleGenericTapButtonForSideDocument {
    return (side: SideDocument) => {
      const options: CameraOptions = {
        'quality': 40,
        'sourceType': this.camera.PictureSourceType.PHOTOLIBRARY,
        'encodingType': this.camera.EncodingType.JPEG,
        'destinationType': this.camera.DestinationType.DATA_URL,
        'saveToPhotoAlbum': false,
        'correctOrientation': true
      }
      this.camera.getPicture(options).then( imageData => {
        side.pathImage = 'data:image/jpeg;base64,' + imageData;
      });
    }
  }

  /**
   * @description Tiene como objetivo definir el manejador destinado para ver los comentarios asociados a una imagen
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-25
   * @param void
   * @returns HandleGenericTapButtonForSideDocument
   */
  private defineHandleTapButtonComments(): HandleGenericTapButtonForSideDocument {
    return (side: SideDocument) => {
      let comments = side.comments.toString();
      if (comments == '') {
        comments = 'No existen observaciones';
      }
      this.utilitiesService.showInfoAlert('Observaciones', comments);
    }
  }
}
