import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HubSetupPageRoutingModule } from './hub-setup-routing.module';

import { HubSetupPage } from './hub-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HubSetupPageRoutingModule,
  ],
  declarations: [HubSetupPage],
})
export class HubSetupPageModule {
}
