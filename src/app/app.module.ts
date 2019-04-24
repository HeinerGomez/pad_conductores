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
import { GeneralModalPageModule } from './general-modal/general-modal.module';

/* modal Pages */
import { GeneralModalPage } from './general-modal/general-modal.page';
import { SidesDocumentModalPage } from './sides-document-modal/sides-document-modal.page';
import { SidesDocumentModalPageModule } from './sides-document-modal/sides-document-modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    GeneralModalPage,
    SidesDocumentModalPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModalPageModule,
    SidesDocumentModalPageModule
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
