import { Document } from 'src/app/models/document';

export interface HandleGenericTabButtonFotCardDocument {
    (document: Document): Promise<HTMLIonModalElement>
}