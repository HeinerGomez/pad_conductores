import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DOCUMENT_STATUS } from '../../data-simulation/data-document-status';
import { Platform, ModalController } from '@ionic/angular';
import { BehaviorCardDocument } from '../../interfaces/own/behaviorCardDocument.interface';
import { SidesDocumentModalPage } from '../../modals/sides-document-modal/sides-document-modal.page';
import { HandleGenericTabButtonFotCardDocument } from '../../interfaces/own/functions/handleGenericTapButtonForCardDocument.interface';
import { BehaviorSideDocument } from '../../interfaces/own/behaviorSideDocument.interface';
import { HandleGenericTapButtonForSideDocument } from '../../interfaces/own/functions/handleGenericTapButtonForSideDocument.interface';
import { UtilitiesService } from '../../services/utilities.service';
import { DocumentBankApiService } from 'src/app/services/api/document-bank-api.service';
import { Document } from 'src/app/models/document';
import { SideDocument } from 'src/app/models/side-document';
import { UserService } from 'src/app/services/api/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-document-bank',
  templateUrl: './document-bank.page.html',
  styleUrls: ['./document-bank.page.scss'],
})
export class DocumentBankPage implements OnInit {

  public documentsForDriver: Document[];
  public documentsForVehicle: Document[];
  public behaviorCardDocument: BehaviorCardDocument;
  public subscriptionId: number;
  private userBackendId: any;
  private user: User;
  
  constructor(
    private camera: Camera, private platform: Platform,
    private modalController: ModalController, private utilitiesService: UtilitiesService,
    private documentAPIService: DocumentBankApiService,
    private userService: UserService
  ) {
    this.subscriptionId = 0;
  }

  ngOnInit() {
    this.behaviorCardDocument = this.defineBehaviorForCardDocument();
    const user: any = localStorage.getItem('user');
      let _user = JSON.parse(user);
      this.userService.getSubscribe(_user.id).subscribe(async (response: any) => {
        if (response != null) {
          this.subscriptionId = response;
        }
        this.userBackendId = await this.getIdUserBackendId();
        this.userService.getUserData(this.userBackendId).subscribe((user: User) => {
          this.user = user;
          this.getDocumentList();
        });
      });
  }

   /**
   * @description Tiene como objetivo obtener el id del usuario del backend pad, en base al
   * id del usuario creado en el sca
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns id: Number
   */
  private async getIdUserBackendId() {
    const user: any = localStorage.getItem('user');
    let _user = JSON.parse(user);
    return await this.userService.getSubscribe(_user.id).toPromise();
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
    this.utilitiesService.showLoading('Cargando');
    if (this.user.subscriptionId !== 0 || this.user.subscriptionId != null) {
      this.documentAPIService.getDocuments(this.user.subscriptionId).subscribe((_documents: Document[]) => {
        this.documentsForDriver = _documents.filter((document: Document) => document.typeResource == 1);
        this.documentsForVehicle = _documents.filter((document: Document) => document.typeResource == 6);
        console.log("Conductores: ", this.documentsForDriver);
        console.log("Vehiculo: ", this.documentsForVehicle);
        this.utilitiesService.closeLoading();
      });
    } else {
      this.utilitiesService.showSnackbar('Usted no cuenta con una suscripción activa, por favor comuniquese con el administrador', 'warning');
      this.utilitiesService.closeLoading();
    }
    
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
    return (document: Document) => {
      const behavior: BehaviorSideDocument = {
        'handleTapCameraButton': this.defineHandleTapButtonCamera(),
        'handleTapGaleryButton': this.defineHandleTapButtonGalery(),
        'handleTapCommentButton': this.defineHandleTapButtonComments()
      };
      const sidesDocumentModal = this.modalController.create({
        'component': SidesDocumentModalPage,
        'componentProps': {
          'cardDocument': document,
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
      const options: CameraOptions = {
        'quality': 40,
        'sourceType': this.camera.PictureSourceType.CAMERA,
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
   * @description Tiene como objetivo definir el manejador destinado para seleccionar una foto de la galeria
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-23
   * @param void
   * @returns HandleGenericTapButtonForSideDocument
   */
  private defineHandleTapButtonGalery(): HandleGenericTapButtonForSideDocument {
    return (side: SideDocument) => {
      const options: CameraOptions = {
        'quality': 50,
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
      let comments = side.comments;
      if (comments == '') {
        comments = 'No existen observaciones';
      }
      this.utilitiesService.showInfoAlert('Observaciones', comments);
    }
  }
}
