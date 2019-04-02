import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ConfigAppStorage } from '../interfaces/own/configAppStorage.interf';
import { UserInSession } from '../interfaces/own/userInSession.interf';

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

}
