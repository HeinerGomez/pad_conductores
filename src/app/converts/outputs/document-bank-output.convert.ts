import { Document as CardDocument } from '../../models/document';
import { SideDocument } from '../../models/side-document';

export class DocumentBankOutput {

    constructor(private document: CardDocument) {}

    public convertDocumentBankForRequestAPI(): any {
        let documentBankForRequest = [];
        let sideNumber = 1;
        for (let side of this.document.sides) {
            documentBankForRequest.push({
                'document_id': this.document.id,
                'route': side.pathImage.startsWith('../assets') ? '' : side.pathImage,
                'document_resource_type_id': this.document.typeResource,
                'side_number': sideNumber,
                'subscription_id': 1, // temporal
                'observation': '',
                'state': side.state
            });
            sideNumber ++;
        }
        console.log("This is the data has been send to the backend ...", this.document);
        return { 'data': documentBankForRequest};
    }

}