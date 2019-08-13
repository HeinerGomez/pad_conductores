import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShouldShowIntroGuard } from './guards/should-show-intro.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'introductory-page', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
  { path:  'introductory-page', loadChildren: './pages/introductory-page/introductory-page.module#IntroductoryPagePageModule', canActivate: [ShouldShowIntroGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'vehicle-association', loadChildren: './pages/vehicle-association/vehicle-association.module#VehicleAssociationPageModule' },
  { path: 'general-modal', loadChildren: './modals/general-modal/general-modal.module#GeneralModalPageModule' },
  { path: 'tab-offers', loadChildren: './components/tab-offers/tab-offers.module#TabOffersPageModule' },
  { path: 'detail-offer', loadChildren: './pages/detail-offer/detail-offer.module#DetailOfferPageModule' },
  { path: 'document-bank', loadChildren: './pages/document-bank/document-bank.module#DocumentBankPageModule' },
  { path: 'sides-document-modal', loadChildren: './modals/sides-document-modal/sides-document-modal.module#SidesDocumentModalPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'personal-data-modal', loadChildren: './modals/personal-data-modal/personal-data-modal.module#PersonalDataModalPageModule' },
  { path: 'about-modal', loadChildren: './modals/about-modal/about-modal.module#AboutModalPageModule' },
  { path: 'change-password-modal', loadChildren: './modals/change-password-modal/change-password-modal.module#ChangePasswordModalPageModule' },
  { path: 'fulfilled-offer', loadChildren: './pages/fulfilled-offer/fulfilled-offer.module#FulfilledOfferPageModule' },
  { path: 'rating-service-company', loadChildren: './pages/rating-service-company/rating-service-company.module#RatingServiceCompanyPageModule' },
  { path: 'rating-service-company-modal', loadChildren: './modals/rating-service-company-modal/rating-service-company-modal.module#RatingServiceCompanyModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
