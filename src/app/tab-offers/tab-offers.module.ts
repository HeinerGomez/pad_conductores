import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabOffersPage } from './tab-offers.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabOffersPage,
    children: [
      {
        path: 'offers',
        loadChildren: '../offers/offers.module#OffersPageModule'
      },
      {
        path: 'my-offers',
        loadChildren: '../my-offers/my-offers.module#MyOffersPageModule'
      },
      {
        path: 'offers-archived',
        loadChildren: '../offers-archived/offers-archived.module#OffersArchivedPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab-offers/tabs/offers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabOffersPage]
})
export class TabOffersPageModule {}
