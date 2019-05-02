import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RatingServiceCompanyModalPage } from './rating-service-company-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RatingServiceCompanyModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RatingServiceCompanyModalPage]
})
export class RatingServiceCompanyModalPageModule {}
