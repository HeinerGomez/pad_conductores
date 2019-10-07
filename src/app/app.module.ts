import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
/* Providers */
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

/* Modulos propios */
import { GeneralModalPageModule } from './modals/general-modal/general-modal.module';

/* modal Pages */
import { GeneralModalPage } from './modals/general-modal/general-modal.page';
import { SidesDocumentModalPage } from './modals/sides-document-modal/sides-document-modal.page';
import { SidesDocumentModalPageModule } from './modals/sides-document-modal/sides-document-modal.module';
import { PersonalDataModalPageModule } from './modals/personal-data-modal/personal-data-modal.module';
import { PersonalDataModalPage } from './modals/personal-data-modal/personal-data-modal.page';
import { AboutModalPage } from './modals/about-modal/about-modal.page';
import { AboutModalPageModule } from './modals/about-modal/about-modal.module';
import { ChangePasswordModalPage } from './modals/change-password-modal/change-password-modal.page';
import { ChangePasswordModalPageModule } from './modals/change-password-modal/change-password-modal.module';
import { RatingServiceCompanyModalPage } from './modals/rating-service-company-modal/rating-service-company-modal.page';
import { RatingServiceCompanyModalPageModule } from './modals/rating-service-company-modal/rating-service-company-modal.module';
import { ErrorsService } from './services/interceptors/errors.service';
import { JwtService } from './services/interceptors/jwt.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UnknownPlateModalPage } from './modals/unknown-plate-modal/unknown-plate-modal.page';
import { UnknownPlateModalPageModule } from './modals/unknown-plate-modal/unknown-plate-modal.module';
import { BindingContractModalPage } from './modals/binding-contract-modal/binding-contract-modal.page';
import { BindingContractModalPageModule } from './modals/binding-contract-modal/binding-contract-modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    GeneralModalPage,
    SidesDocumentModalPage,
    PersonalDataModalPage,
    AboutModalPage,
    ChangePasswordModalPage,
    RatingServiceCompanyModalPage,
    UnknownPlateModalPage,
    BindingContractModalPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModalPageModule,
    SidesDocumentModalPageModule,
    PersonalDataModalPageModule,
    AboutModalPageModule,
    ChangePasswordModalPageModule,
    RatingServiceCompanyModalPageModule,
    UnknownPlateModalPageModule,
    BindingContractModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    Camera,
    {
			provide: HTTP_INTERCEPTORS, useClass: ErrorsService, multi: true,
    },
    {
			provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true,
		},
    OneSignal,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
