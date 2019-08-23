import { Component, OnInit, Input } from '@angular/core';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';
import { ItemOfferOptions } from '../../interfaces/own/itemOfferOptions.interface';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-item-offer',
  templateUrl: './item-offer.component.html',
  styleUrls: ['./item-offer.component.scss'],
})
export class ItemOfferComponent implements OnInit {

  @Input('itemOffer') public itemOffer: Offer;
  @Input('options') public options: ItemOfferOptions;

  constructor(private router: Router) { }

  ngOnInit() {}

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento de seleccionar una oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-16
   * @param void
   * @returns void
   */
  public handleTapItemOffer(): void {
    this.options.handleTapItemOffer(this.itemOffer);
  }

  /**
   * @description Tiene como objetivo manejar la logica de lo que sucede al momento dar click al boton de archivar una oferta
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-04-16
   * @param void
   * @returns void
   */
  public handleTapButtonArchive(): void {
    this.options.handleTapButtonArchive(this.itemOffer);
  }

}
