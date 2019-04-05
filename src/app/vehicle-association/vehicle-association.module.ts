import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VehicleAssociationPage } from './vehicle-association.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleAssociationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehicleAssociationPage]
})
export class VehicleAssociationPageModule {}
