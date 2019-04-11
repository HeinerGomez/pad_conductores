import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemOfferComponent } from './item-offer/item-offer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ItemOfferComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ItemOfferComponent
  ]
})
export class ComponentsModule { }
