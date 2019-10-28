export class PayOfferOutput {

    constructor() {

    }

    public convertPayOfferForRequestAPI(data: any) {
        const objRequest = {
            "tokenCard": {
                "card[number]":"999876734654353",
                "card[exp_year]":"2017",                                                                                                                                                                                                                                                                                     
                "card[exp_month]":"07",
                "card[cvc]":"123"
            },
            "driverId": "1",
            "offerId": "1"
        };
    }

}