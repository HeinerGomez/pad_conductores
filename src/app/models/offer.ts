export class Offer {

    private _id: number;
    private _nameOriginCity: string;
    private _nameDestinationCity: string;
    private _weight: string;
    private _loadDate: string;
    private _loadTime: string;
    private _vacancy: number;
    private _serviceRating: string;
    private _loadFree: boolean;
    private _downloadFree: boolean;
    private _merchandise: string;
    private _freight: number;
    private _contactPhone: string;
    private _contactName: string;

    constructor(offer: any = false) {
        if (offer) {
            this.build(offer);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get nameOriginCity(): string {
        return this._nameOriginCity;
    }

    public get nameDestinationCity(): string {
        return this._nameDestinationCity;
    }

    public get weight(): string {
        return this._weight;
    }

    public get loadDate(): string {
        return this._loadDate;
    }

    public get loadTime(): string {
        return this._loadTime;
    }

    public get vacancy(): number {
        return this._vacancy;
    }

    public get serviceRating(): string {
        return this._serviceRating;
    }

    public get loadFree(): boolean {
        return this._loadFree;
    }

    public get downloadFree(): boolean {
        return this._downloadFree;
    }

    public get merchandise(): string {
        return this._merchandise;
    }

    public get freight(): number {
        return this._freight;
    }

    public get contactPhone(): string {
        return this._contactPhone;
    }

    public get contactName(): string {
        return this._contactName;
    }


    private build(offer: any) {
        this._id = offer.offer_id;
        this._nameOriginCity = offer.data_offer[0].origin_town.name;
        this._nameDestinationCity = offer.data_offer[0].destination_town.name;
        this._weight = offer.data_offer[0].departure_weight;
        this._loadDate = offer.data_offer[0].charge_datetime.split(" ")[0];
        this._loadTime = offer.data_offer[0].charge_datetime.split(" ")[1];
        this._vacancy = offer.data_offer[0].number_offer;
        this._serviceRating = offer.transport_ranking;
        let isLoadFree = false; 
        let isDownloadFree = false;
        for (let characteristOffer of offer.data_offer[0].characteristic_offer) {
            // libre de cargue
            if (characteristOffer.id == 1) {
                isLoadFree = true;
            }
            // libre de descargue
            if (characteristOffer.id == 2) {
                isDownloadFree;
            }
        }
        this._loadFree = isLoadFree;
        this._downloadFree = isDownloadFree;
        this._merchandise = offer.data_offer[0].departure_description;
        this._freight = offer.data_offer[0].freightage_min;
        this._contactPhone = '?';
        this._contactName = '???';
    }       

}