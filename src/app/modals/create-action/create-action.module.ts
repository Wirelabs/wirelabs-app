import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateActionPageRoutingModule } from './create-action-routing.module';

import { CreateActionPage } from './create-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateActionPageRoutingModule
  ],
  declarations: [CreateActionPage]
})
export class CreateActionPageModule {}
