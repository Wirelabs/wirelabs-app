import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HubOverviewPage } from './hub-overview.page';

const routes: Routes = [
  {
    path: '',
    component: HubOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HubOverviewPageRoutingModule {}
