import { CardDocument } from '../cardDocument.interface';

export interface HandleGenericTapButtonForSideDocument {
    (cardDocument: CardDocument): void | CardDocument
}