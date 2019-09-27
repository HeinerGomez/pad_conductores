import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnknownPlateModalPage } from './unknown-plate-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UnknownPlateModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnknownPlateModalPage]
})
export class UnknownPlateModalPageModule {}
