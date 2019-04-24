import { HandleGenericTapButtonForSideDocument } from './own/functions/handleGenericTapButtonForSideDocument.interface';

export interface BehaviorSideDocument {
    'handleTapButtonCamera': HandleGenericTapButtonForSideDocument,
    'handleTapButtonGalery': HandleGenericTapButtonForSideDocument,
    'handleTapButtonComment': HandleGenericTapButtonForSideDocument
}