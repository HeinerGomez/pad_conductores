import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShouldShowIntroGuard } from './guards/should-show-intro.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'introductory-page', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'introductory-page', loadChildren: './introductory-page/introductory-page.module#IntroductoryPagePageModule', canActivate: [ShouldShowIntroGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'vehicle-association', loadChildren: './vehicle-association/vehicle-association.module#VehicleAssociationPageModule' },
  { path: 'general-modal', loadChildren: './general-modal/general-modal.module#GeneralModalPageModule' },
  { path: 'tab-offers', loadChildren: './tab-offers/tab-offers.module#TabOffersPageModule' },
  { path: 'detail-offer', loadChildren: './detail-offer/detail-offer.module#DetailOfferPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
