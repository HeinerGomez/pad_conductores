import { Component, OnInit } from '@angular/core';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { ParamsOfDetailOffer } from '../../interfaces/own/paramsOfDetailOffer.interface';
import { OFFER } from '../../constants/offers.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating-service-company',
  templateUrl: './rating-service-company.page.html',
  styleUrls: ['./rating-service-company.page.scss'],
})
export class RatingServiceCompanyPage implements OnInit {

  public items: ItemOffer[] = [];
  public itemOptions: ItemOfferOptions;

  constructor(private router: Router) {
    this.itemOptions = this.defineItemOptions();
    this.items.push({
      'originCity': 'BOGOTA',
      'destinationCity': 'CALI',
      'freightValue': 1200000,
      'merchandiseWeight': 35,
      'loadDate': '2019-04-15',
      'loadTime': '17:45',
      'agoTime': 38,
      'vacancy': 10,
      'fulfilled': true
    });
  }

  ngOnInit() {
  }

   /**
   * @description Tiene como objetivo definir las opciones(opciones, funciones), que tienen asociados al componente "ItemOffer"
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-02
   * @param event
   * @returns void
   */
  private defineItemOptions(): ItemOfferOptions {
    const params: ParamsOfDetailOffer = {
      'origin': OFFER.ORIGIN_FULFILLED,
      'buttonArchive': false
    };
    return {
      'handleTapItemOffer': () => {
        this.router.navigate(['/detail-offer', params]);
      }
    };
  }

}
