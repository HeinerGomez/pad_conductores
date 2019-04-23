import { HandleTapCameraButtonForCardDocument } from './functions/handleTapCameraButtonForCardDocument.interface';

export interface CardDocumentOptions {
    'handleTapCameraButton': HandleTapCameraButtonForCardDocument,
    'handleTapPictureButton': () => void,
    'handleTapCommentButton': () => void
}