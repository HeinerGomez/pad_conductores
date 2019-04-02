import { Injectable } from '@angular/core';
import { UserInSession } from '../interfaces/own/userInSession.interf';
import { StorageDataService } from '../services/storage-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageDataService: StorageDataService) { }

   /**
   * @description Tiene como objetivo autenticar a un usuario en la app
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-01
   * @param user
   * @returns Promise<any>
   */
  public Authenticate(user: UserInSession): Promise<any> {
    return this.storageDataService.setUserInSession(user);
  }

  /**
   * @description Tiene como objetivo des-autenticar a un usuario en la app
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-02
   * @param user
   * @returns Promise<any>
   */
  public UnAuhenticated(): Promise<any> {
    return this.storageDataService.removeUserInSession();
  }

  /**
   * @description Tiene como objetivo verificar si existe o no un usuario autenticado
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-02
   * @param void
   * @returns Promise<any>
   */
  public isAuthenticated(): Promise<any> {
    return this.storageDataService.getUserInSession();
  }
}
