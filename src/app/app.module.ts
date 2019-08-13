import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
/* Providers */
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera } from '@ionic-native/camera/ngx';

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
    RatingServiceCompanyModalPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModalPageModule,
    SidesDocumentModalPageModule,
    PersonalDataModalPageModule,
    AboutModalPageModule,
    ChangePasswordModalPageModule,
    RatingServiceCompanyModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
