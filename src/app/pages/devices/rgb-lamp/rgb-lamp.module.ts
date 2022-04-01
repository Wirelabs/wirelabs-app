import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RgbLampPageRoutingModule } from './rgb-lamp-routing.module';

import { RgbLampPage } from './rgb-lamp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RgbLampPageRoutingModule
  ],
  declarations: [RgbLampPage]
})
export class RgbLampPageModule {}
