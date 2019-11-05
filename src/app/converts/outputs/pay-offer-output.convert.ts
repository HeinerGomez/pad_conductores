import { CryptoVigenereService } from '../../services/crypto-vigenere.service';
import { environment } from 'src/environments/environment';
export class PayOfferOutput {

    constructor(private cryptoVigenereService: CryptoVigenereService) {

    }

    public convertPayOfferForRequestAPI(data: any) {
        const keyCardNumber = this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, "card[number]");
        const keyYear = this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, "card[exp_year]");
        const keyMonth = this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, "card[exp_month]");
        const keyCCV = this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, "card[cvc]");
        const objRequest = {
            "tokenCard": {
                [keyCardNumber]: this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, `${data.cardNumber}`),
                [keyYear]: this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, `${data.year}`),                                                                                                                                                                                                                                                                                     
                [keyMonth]: this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, `${data.month}`),
                [keyCCV]: this.cryptoVigenereService.encodeTerm(`${environment.KEY_VIGENERE}`, `${data.ccv}`)
            },
            "driverId": data.driverId,
            "offerId": data.offerId,
            "document_number": data.documentNumber,
            "name": data.nameHolder.split(" ")[0],
            "last_name": data.nameHolder.split(" ")[1]
        };
        return objRequest;
    }

}