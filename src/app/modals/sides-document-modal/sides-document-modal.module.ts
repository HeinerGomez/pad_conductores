import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SidesDocumentModalPage } from './sides-document-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SidesDocumentModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SidesDocumentModalPage]
})
export class SidesDocumentModalPageModule {}
