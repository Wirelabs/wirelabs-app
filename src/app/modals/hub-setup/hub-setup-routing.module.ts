import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HubSetupPage } from './hub-setup.page';

const routes: Routes = [
  {
    path: '',
    component: HubSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HubSetupPageRoutingModule {}
