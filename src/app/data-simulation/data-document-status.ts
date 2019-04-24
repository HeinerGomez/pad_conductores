import { CardDocument } from '../interfaces/own/cardDocument.interface';

export const DOCUMENT_STATUS: CardDocument[] = [
    {
        'documentName': 'ARL',
        'pathImageSticker': 'https://www.arlsura.com/images/stories/desafiliacion_formnovedades.jpg',
        'ribbonStatus': 'ribbon-approved',
        'documentStatus': 'Aprobado',
        'numberSides': 1,
        'sides': [
            {
                'documentName': 'ARL',
                'sideName': 'Lado 1',
                'pathImage': 'https://www.arlsura.com/images/stories/desafiliacion_formnovedades.jpg',
                'sideStatus': 'Aprobado',
                'comments': ''
            }
        ]
    },
    {
        'documentName': 'Cédula',
        'pathImageSticker': 'https://www.registraduria.gov.co/IMG/jpg/cedula_frontal.jpg',
        'ribbonStatus': 'ribbon-review',
        'documentStatus': 'En Revisión',
        'numberSides': 2,
        'sides': [
            {
                'documentName': 'Cédula',
                'sideName': 'Lado 1',
                'sideStatus': 'Aprobado',
                'pathImage': 'https://www.registraduria.gov.co/IMG/jpg/cedula_frontal.jpg',
                'comments': ''
            },
            {
                'documentName': 'Cédula',
                'sideName': 'Lado 2',
                'sideStatus': 'En revisión',
                'pathImage': 'https://www.registraduria.gov.co/IMG/jpg/cedula_frontal.jpg',
                'comments': ''
            }
        ]
    },
    {
        'documentName': 'Foto Rostro',
        'pathImageSticker': '',
        'ribbonStatus': 'ribbon-pending',
        'documentStatus': 'No cargada',
        'numberSides': 1,
        'sides': [
            {
                'documentName': 'Foto Rostro',
                'sideName': 'Lado 1',
                'sideStatus': 'No cargada',
                'pathImage': '',
                'comments': ''
            }
        ]
    },
    {
        'documentName': 'Licencia de conducción',
        'pathImageSticker': 'https://www.revistaautocrash.com/wp-content/uploads/2018/01/licencia-e1516138339660.jpg',
        'ribbonStatus': 'ribbon-rejected',
        'documentStatus': 'Rechazada',
        'numberSides': 2,
        'sides': [
            {
                'documentName': 'Licencia de conducción',
                'sideName': 'Lado 1',
                'sideStatus': 'Aprobada',
                'pathImage': 'https://www.revistaautocrash.com/wp-content/uploads/2018/01/licencia-e1516138339660.jpg',
                'comments': ''
            }, 
            {
                'documentName': 'Licencia de conducción',
                'sideName': 'Lado 2',
                'sideStatus': 'Rechazada',
                'pathImage': 'https://www.revistaautocrash.com/wp-content/uploads/2018/01/licencia-e1516138339660.jpg',
                'comments': 'Lado repetido, debe adjuntar el lado trasero de la licencia'
            }
        ]
    }
]