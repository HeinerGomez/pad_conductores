import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ConfigAppStorage } from '../interfaces/own/configAppStorage.interf';
import { UserInSession } from '../interfaces/own/userInSession.interf';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  constructor(private localStorage: NativeStorage) { }

  /**
   * @description Tiene como objetivo establecer la configuracion de la app en el almacenamiento local
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param config
   * @returns Promise<any>
   */
  public setConfigApp(config: ConfigAppStorage): Promise<any> {
    return this.localStorage.setItem('config', config);
  }

  /**
   * @description Tiene como objetivo obtener la configuracion de la app en el almacenamiento local
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param config
   * @returns Promise<any>
   */
  public getConfigApp(): Promise<any> {
    return this.localStorage.getItem('config');
  }

  /**
   * @description Tiene como objetivo establecer el usuario que se encuentra en sesión
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param user
   * @returns Promise<any>
   */
  public setUserInSession(user: UserInSession): Promise<any> {
    return this.localStorage.setItem('user', user);
  }

  /**
   * @description Tiene como objetivo obtener el usuario que se encuentra en sesión
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param void
   * @returns Promise<any>
   */
  public getUserInSession(): Promise<any> {
    return this.localStorage.getItem('user');
  }

  /**
   * @description Tiene como objetivo elminar el usuario que se encuentra en sesión
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-02
   * @param void
   * @returns Promise<any>
   */
  public removeUserInSession(): Promise<any> {
    return this.localStorage.remove('user');
  }

  /**
   * @description Tiene como objetivo validar si una oferta existe y si no agregarla al almacenamiento
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns Promise<any>
   */
  public setOffer(offer: Offer): Promise<any> {
    // valido si la oferta ya esta almacenada
    return this.getOffers().then((offers: Offer[]) => {
      return this.storageOffer(offer, false);
    }).catch(error => {
      // si hay un error, se asume que no hay ofertas almacenadas
      return this.storageOffer(offer, true);
    })
  }

  /**
   * @description Tiene como objetivo filtrar las ofertas y dejar solo las que no estan almacenadas
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns Promise<any>
   */
  public filterOffers(offers: Offer[]): any {
    this.getOffers().then((storageOffers) => {
      let _storageOffers: Offer[] = (storageOffers as Offer[]).map((storageOffer: Offer) => Object.assign(new Offer(), storageOffer));
      for (let _storageOffer of _storageOffers) {
        let counter = 0;
        for (let offer of offers) {
          if (offer.id == _storageOffer.id) {
            offers.splice(counter, 1);
          }
          counter ++;
        }
      }
    });
    return offers;
  }

   /**
   * @description Tiene como objetivo obtener todas las ofertas almacenadas
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param void
   * @returns Promise<any>
   */
  public getOffers(): Promise<any> {
    return this.localStorage.getItem('offers');
  }

  /**
   * @description Tiene como objetivo almacenar una oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @param offer: Offer - La oferta a almacenar
   * @param initialOffer: boolean
   * @returns Promise<any>
   */
  private storageOffer(offer: Offer, initialOffer: boolean = false): Promise<any> {
    let offers: Offer[] = [];
    offers.push(offer);
    if (!initialOffer) {
      this.getOffers().then((_offers: Offer[]) => {
        offers.push(... _offers);
        return this.localStorage.setItem('offers', offers);
      });
    } else {
      return this.localStorage.setItem('offers', offers);
    }
    
  }

  /**
   * 
   */
  public cleanOffers(): Promise<any> {
    return this.localStorage.remove('offers');
  }

}
