import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationsPageRoutingModule } from './personal-informations-routing.module';

import { PersonalInformationsPage } from './personal-informations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInformationsPageRoutingModule
  ],
  declarations: [PersonalInformationsPage]
})
export class PersonalInformationsPageModule {}
