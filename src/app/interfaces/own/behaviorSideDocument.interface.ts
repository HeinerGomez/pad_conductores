import { HandleGenericTapButtonForSideDocument } from './functions/handleGenericTapButtonForSideDocument.interface';

export interface BehaviorSideDocument {
    'handleTapCameraButton': HandleGenericTapButtonForSideDocument,
    'handleTapGaleryButton': HandleGenericTapButtonForSideDocument,
    'handleTapCommentButton': HandleGenericTapButtonForSideDocument,
    'handleTapCloseButton'?: () => void
}