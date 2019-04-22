import { Component, OnInit } from '@angular/core';
import { CardDocument } from '../interfaces/own/cardDocument.interface';
import { CardDocumentOptions } from '../interfaces/own/cardDocumentOptions.interface';

@Component({
  selector: 'app-document-bank',
  templateUrl: './document-bank.page.html',
  styleUrls: ['./document-bank.page.scss'],
})
export class DocumentBankPage implements OnInit {

  public cardDocuments: CardDocument[] = [];
  public options: CardDocumentOptions;

  constructor() {
    this.cardDocuments.push({
      'documentName': 'ARL',
      'documentComment': 'El documento ARL ha sido aprobado',
      'pathImageSticker': '',
      'ribbonStatus': 'ribbon-approved',
      'documentStatus': 'Aprobado'
    });
    this.cardDocuments.push({
      'documentName': 'Cédula',
      'documentComment': 'El documento Cédula esta en revisión',
      'pathImageSticker': '',
      'ribbonStatus': 'ribbon-review',
      'documentStatus': 'En Revisión'
    });
    this.cardDocuments.push({
      'documentName': 'Foto Rostro',
      'documentComment': '',
      'pathImageSticker': '',
      'ribbonStatus': 'ribbon-pending',
      'documentStatus': 'No cargada'
    });
    this.cardDocuments.push({
      'documentName': 'Licencia de conducción',
      'documentComment': 'La licencia ha caducado',
      'pathImageSticker': '',
      'ribbonStatus': 'ribbon-rejected',
      'documentStatus': 'Rechazada'
    });
    this.options = {
      'handleTapCameraButton': (cardDocument: CardDocument) => {
        cardDocument.pathImageSticker = 'assets/imgs/cam_placeholder.png'
      }, 
      'handleTapCommentButton': () => {},
      'handleTapPictureButton': () => {}
    }
  }

  ngOnInit() {
  }

}
