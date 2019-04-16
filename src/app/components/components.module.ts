import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemOfferComponent } from './item-offer/item-offer.component';
import { CardPlateComponent } from './card-plate/card-plate.component';

@NgModule({
  declarations: [
    ItemOfferComponent,
    CardPlateComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ItemOfferComponent,
    CardPlateComponent
  ]
})
export class ComponentsModule { }
