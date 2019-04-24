import { SideDocument } from './sideDocument.interface';

export interface CardDocument {
    'pathImageSticker': String,
    'documentName': String,
    'documentStatus': String,
    'ribbonStatus': String,
    'numberSides': number | String,
    'sides': SideDocument[]
}