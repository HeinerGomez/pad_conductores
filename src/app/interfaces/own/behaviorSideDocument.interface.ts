import { HandleGenericTapButtonForSideDocument } from './functions/handleGenericTapButtonForSideDocument.interface';

export interface BehaviorSideDocument {
    'handleTapButtonCamera': HandleGenericTapButtonForSideDocument,
    'handleTapButtonGalery': HandleGenericTapButtonForSideDocument,
    'handleTapButtonComment': HandleGenericTapButtonForSideDocument,
    'handleTapButtonClose'?: () => void
}