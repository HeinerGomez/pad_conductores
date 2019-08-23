import { Offer } from 'src/app/models/offer';

export interface ItemOfferOptions {
    'handleTapItemOffer'?: (offer: Offer) => void,
    'handleTapButtonArchive'?: (offer: Offer) => void,
    'buttonArchive'?: boolean,
    'hasChip'?: boolean
}