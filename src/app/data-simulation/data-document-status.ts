import { CardDocument } from '../interfaces/own/cardDocument.interface';

export const DOCUMENT_STATUS: CardDocument[] = [
    {
        'documentName': 'ARL',
        'documentComment': 'El documento ARL ha sido aprobado',
        'pathImageSticker': 'https://www.arlsura.com/images/stories/desafiliacion_formnovedades.jpg',
        'ribbonStatus': 'ribbon-approved',
        'documentStatus': 'Aprobado'
    },
    {
        'documentName': 'Cédula',
        'documentComment': 'El documento Cédula esta en revisión',
        'pathImageSticker': 'https://www.registraduria.gov.co/IMG/jpg/cedula_frontal.jpg',
        'ribbonStatus': 'ribbon-review',
        'documentStatus': 'En Revisión'
    },
    {
        'documentName': 'Foto Rostro',
        'documentComment': '',
        'pathImageSticker': '',
        'ribbonStatus': 'ribbon-pending',
        'documentStatus': 'No cargada'
    },
    {
        'documentName': 'Licencia de conducción',
        'documentComment': 'La licencia ha caducado',
        'pathImageSticker': 'https://www.revistaautocrash.com/wp-content/uploads/2018/01/licencia-e1516138339660.jpg',
        'ribbonStatus': 'ribbon-rejected',
        'documentStatus': 'Rechazada'
    }
]