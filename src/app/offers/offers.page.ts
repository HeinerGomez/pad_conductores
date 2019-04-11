import { Component, OnInit } from '@angular/core';
import { StorageDataService } from '../services/storage-data.service';
import { UserInSession } from '../interfaces/own/userInSession.interf';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { ItemOffer } from '../interfaces/own/itemOffer.interf';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  
  public items: ItemOffer[] = [];
  public enabledRefresh: boolean;

  constructor() { 
    this.enabledRefresh = true;
    this.items.push({
      'originCity': 'BOGOTA',
      'destinationCity': 'CALI',
      'freightValue': 1200000,
      'merchandiseWeight': 35,
      'loadDate': '2019-04-15',
      'loadTime': '17:45',
      'agoTime': 38,
      'vacancy': 10
    });
    this.items.push({
      'originCity': 'BOGOTA',
      'destinationCity': 'MEDELLIN',
      'freightValue': 1000000,
      'merchandiseWeight': 15,
      'loadDate': '2019-05-11',
      'loadTime': '17:15',
      'agoTime': 40,
      'vacancy': 30
    });
    this.items.push({
      'originCity': 'BARRANQUILLA',
      'destinationCity': 'CARTAGENA',
      'freightValue': 180000,
      'merchandiseWeight': 5,
      'loadDate': '2019-04-13',
      'loadTime': '10:45',
      'agoTime': 10,
      'vacancy': 3
    });
    this.items.push({
      'originCity': 'BOGOTA',
      'destinationCity': 'MEDELLIN',
      'freightValue': 1450000,
      'merchandiseWeight': 25,
      'loadDate': '2019-04-12',
      'loadTime': '17:45',
      'agoTime': 55,
      'vacancy': 7
    });
    this.items.push({
      'originCity': 'CARTAGENA',
      'destinationCity': 'BOGOTA',
      'freightValue': 110000,
      'merchandiseWeight': 10,
      'loadDate': '2019-04-17',
      'loadTime': '18:45',
      'agoTime': 31,
      'vacancy': 1
    });
    this.items.push({
      'originCity': 'BARRANQUILLA',
      'destinationCity': 'BARRANCABERMEJA',
      'freightValue': 1880000,
      'merchandiseWeight': 38,
      'loadDate': '2019-04-11',
      'loadTime': '11:45',
      'agoTime': 10,
      'vacancy': 2
    });
  }

  ngOnInit() {
    
  }

  /**
   * @description Tiene como objetivo manejar el refresh cuando se desliza la pantalla hacia arriba
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-10
   * @param event
   * @returns void
   */
  public handleSlideDownRefresh(event): void {
    setTimeout( () => {
      event.target.complete();
    }, 3000);
  }

   /**
   * @description Tiene como objetivo manejar el scroll para evitar que se cruze con el evento del scroll hacia arriba,
   *              para el recargado de las ofertas
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-11
   * @param event
   * @returns void
   */
  public handleScroll(event): void {
    if (event.srcElement.scrollTop == 0) {
      this.enabledRefresh = true;
    } else {
      this.enabledRefresh = false;
    }
  }
}
