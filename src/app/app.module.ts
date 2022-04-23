import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/authentication/auth.interceptor';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { HubSetupPage } from './modals/hub-setup/hub-setup.page';
import { QrCodePage } from './modals/qr-code/qr-code.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { HubOverviewPageModule } from './pages/hub-overview/hub-overview.module';
import { HubSetupPageModule } from './modals/hub-setup/hub-setup.module';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@NgModule({
  declarations: [AppComponent, QrCodePage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SuperTabsModule.forRoot(), HubOverviewPageModule, HubSetupPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, WifiWizard2, Network],
  bootstrap: [AppComponent],
})
export class AppModule {}
