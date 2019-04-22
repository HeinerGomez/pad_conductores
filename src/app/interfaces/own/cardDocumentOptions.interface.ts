import { CardDocument } from './cardDocument.interface';

export interface CardDocumentOptions {
    'handleTapCameraButton': (cardDocument: CardDocument) => void | CardDocument,
    'handleTapPictureButton': () => void,
    'handleTapCommentButton': () => void
}