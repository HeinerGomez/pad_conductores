import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FulfilledOfferPage } from './fulfilled-offer.page';

const routes: Routes = [
  {
    path: '',
    component: FulfilledOfferPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FulfilledOfferPage]
})
export class FulfilledOfferPageModule {}
