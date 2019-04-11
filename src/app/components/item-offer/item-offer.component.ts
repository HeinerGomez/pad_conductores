import { Component, OnInit, Input } from '@angular/core';
import { ItemOffer } from '../../interfaces/own/itemOffer.interf';

@Component({
  selector: 'app-item-offer',
  templateUrl: './item-offer.component.html',
  styleUrls: ['./item-offer.component.scss'],
})
export class ItemOfferComponent implements OnInit {

  @Input('itemOffer') public itemOffer: ItemOffer;

  constructor() { }

  ngOnInit() {}

}
