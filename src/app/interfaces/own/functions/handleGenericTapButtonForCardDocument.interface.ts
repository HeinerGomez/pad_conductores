import { CardDocument } from '../cardDocument.interface';

export interface HandleGenericTabButtonFotCardDocument {
    (cardDocument: CardDocument): Promise<HTMLIonModalElement>
}