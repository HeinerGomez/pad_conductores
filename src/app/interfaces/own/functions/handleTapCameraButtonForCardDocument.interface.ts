import { CardDocument } from '../cardDocument.interface';

export interface HandleTapCameraButtonForCardDocument {
    (CardDocument: CardDocument): void | CardDocument
}