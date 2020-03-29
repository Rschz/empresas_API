import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmpresaPage } from './empresa/empresa.page';
import { EmpresaPageModule } from './empresa/empresa.module';
import { CreateOrUpdatePageModule } from './create-or-update/create-or-update.module';
import { CreateOrUpdatePage } from './create-or-update/create-or-update.page';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [EmpresaPage, CreateOrUpdatePage],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, EmpresaPageModule, CreateOrUpdatePageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
