import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntroductoryPagePage } from './introductory-page.page';

const routes: Routes = [
  {
    path: '',
    component: IntroductoryPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntroductoryPagePage]
})
export class IntroductoryPagePageModule {}
