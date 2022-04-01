import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RgbLampPage } from './rgb-lamp.page';

const routes: Routes = [
  {
    path: '',
    component: RgbLampPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RgbLampPageRoutingModule {}
