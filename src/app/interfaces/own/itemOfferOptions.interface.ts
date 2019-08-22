import { Offer } from 'src/app/models/offer';

export interface ItemOfferOptions {
    'handleTapItemOffer': (offer: Offer) => void,
    'handleTapButtonArchive'?: () => void,
    'buttonArchive'?: boolean,
    'hasChip'?: boolean
}