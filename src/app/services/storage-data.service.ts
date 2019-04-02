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
   * @returns Promise<boolean>
   */
  public setConfigApp(config: ConfigAppStorage): Promise<boolean> {
    return this.localStorage.setItem('config', config).then( () => {
      return true;
    }).catch(error => {
      console.error('Ha ocurrido un error con el almacenamiento local al momento de establecer la configuracion de la app');
      return false;
    });
  }

  /**
   * @description Tiene como objetivo obtener la configuracion de la app en el almacenamiento local
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param config
   * @returns Promise<ConfigAppStorage> | Promise<boolean>
   */
  public getConfigApp(): Promise<ConfigAppStorage> | Promise<boolean> {
    return this.localStorage.getItem('config').then(config => config).catch(error => {
      console.warn('No fue posible obtener la configuracion de la app');
      return false;
    });
  }

  /**
   * @description Tiene como objetivo establecer el usuario que se encuentra en sesión
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param user
   * @returns Promise<boolean>
   */
  public setUserInSession(user: UserInSession): Promise<boolean> {
    return this.localStorage.setItem('user', user).then( () => {
      return true;
    }).catch(error => {
      console.error('Ha ocurrido un error con el almacenamiento local al momento de estableces el usuario en sesión');
      return false;
    });
  }

  /**
   * @description Tiene como objetivo obtener el usuario que se encuentra en sesión
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param void
   * @returns Promise<UserInSession> | Promise<boolean>
   */
  public getUserInSession(): Promise<UserInSession> | Promise<boolean> {
    return this.localStorage.getItem('user').then(user => user).catch(error => {
      console.warn('No fue posible obtener el usuario en session');
      return false;
    });
  }

  /**
   * @description Tiene como objetivo elminar el usuario que se encuentra en sesión
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-02
   * @param void
   * @returns Promise<boolean>
   */
  public removeUserInSession(): Promise<boolean> {
    return this.localStorage.remove('user').then( ()  => true).catch(error => {
      console.warn('No fue posible eliminar el usuario en sesión');
      return false;
    });
  }

}
