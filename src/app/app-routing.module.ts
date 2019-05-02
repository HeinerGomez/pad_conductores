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
  { path: 'document-bank', loadChildren: './document-bank/document-bank.module#DocumentBankPageModule' },
  { path: 'sides-document-modal', loadChildren: './sides-document-modal/sides-document-modal.module#SidesDocumentModalPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'personal-data-modal', loadChildren: './personal-data-modal/personal-data-modal.module#PersonalDataModalPageModule' },
  { path: 'about-modal', loadChildren: './about-modal/about-modal.module#AboutModalPageModule' },
  { path: 'change-password-modal', loadChildren: './change-password-modal/change-password-modal.module#ChangePasswordModalPageModule' },
  { path: 'fulfilled-offer', loadChildren: './fulfilled-offer/fulfilled-offer.module#FulfilledOfferPageModule' },  { path: 'rating-service-company', loadChildren: './rating-service-company/rating-service-company.module#RatingServiceCompanyPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
