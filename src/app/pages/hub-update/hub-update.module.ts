import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HubUpdatePageRoutingModule } from './hub-update-routing.module';

import { HubUpdatePage } from './hub-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HubUpdatePageRoutingModule
  ],
  declarations: [HubUpdatePage]
})
export class HubUpdatePageModule {}
