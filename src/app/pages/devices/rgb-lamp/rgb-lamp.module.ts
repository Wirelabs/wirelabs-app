import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RgbLampPageRoutingModule } from './rgb-lamp-routing.module';

import { RgbLampPage } from './rgb-lamp.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RgbLampPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [RgbLampPage]
})
export class RgbLampPageModule {}
