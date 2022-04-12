import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateActionPage } from './create-action.page';

const routes: Routes = [
  {
    path: '',
    component: CreateActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateActionPageRoutingModule {}
