import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemOfferComponent } from './item-offer/item-offer.component';
import { CardPlateComponent } from './card-plate/card-plate.component';
import { CardDocumentComponent } from './card-document/card-document.component';

@NgModule({
  declarations: [
    ItemOfferComponent,
    CardPlateComponent,
    CardDocumentComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ItemOfferComponent,
    CardPlateComponent,
    CardDocumentComponent
  ]
})
export class ComponentsModule { }
