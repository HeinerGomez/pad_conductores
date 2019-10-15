import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShouldShowIntroGuard } from './guards/should-show-intro.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'introductory-page', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
  { path:  'introductory-page', loadChildren: './pages/introductory-page/introductory-page.module#IntroductoryPagePageModule', canActivate: [ShouldShowIntroGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AuthGuard] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'vehicle-association', loadChildren: './pages/vehicle-association/vehicle-association.module#VehicleAssociationPageModule'},
  { path: 'general-modal', loadChildren: './modals/general-modal/general-modal.module#GeneralModalPageModule', canActivate: [AuthGuardService] },
  { path: 'tab-offers', loadChildren: './components/tab-offers/tab-offers.module#TabOffersPageModule', canActivate: [AuthGuardService] },
  { path: 'detail-offer', loadChildren: './pages/detail-offer/detail-offer.module#DetailOfferPageModule', canActivate: [AuthGuardService] },
  { path: 'document-bank', loadChildren: './pages/document-bank/document-bank.module#DocumentBankPageModule', canActivate: [AuthGuardService] },
  { path: 'sides-document-modal', loadChildren: './modals/sides-document-modal/sides-document-modal.module#SidesDocumentModalPageModule', canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'personal-data-modal', loadChildren: './modals/personal-data-modal/personal-data-modal.module#PersonalDataModalPageModule', canActivate: [AuthGuardService] },
  { path: 'about-modal', loadChildren: './modals/about-modal/about-modal.module#AboutModalPageModule', canActivate: [AuthGuardService] },
  { path: 'change-password-modal', loadChildren: './modals/change-password-modal/change-password-modal.module#ChangePasswordModalPageModule' },
  { path: 'fulfilled-offer', loadChildren: './pages/fulfilled-offer/fulfilled-offer.module#FulfilledOfferPageModule', canActivate: [AuthGuardService] },
  { path: 'rating-service-company', loadChildren: './pages/rating-service-company/rating-service-company.module#RatingServiceCompanyPageModule', canActivate: [AuthGuardService] },
  { path: 'rating-service-company-modal', loadChildren: './modals/rating-service-company-modal/rating-service-company-modal.module#RatingServiceCompanyModalPageModule', canActivate: [AuthGuardService] },  { path: 'unknown-plate-modal', loadChildren: './modals/unknown-plate-modal/unknown-plate-modal.module#UnknownPlateModalPageModule' },
  { path: 'binding-contract-modal', loadChildren: './modals/binding-contract-modal/binding-contract-modal.module#BindingContractModalPageModule' },
  { path: 'pay-modal', loadChildren: './modals/pay-modal/pay-modal.module#PayModalPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
