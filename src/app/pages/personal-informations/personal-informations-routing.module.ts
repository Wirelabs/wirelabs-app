import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalInformationsPage } from './personal-informations.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationsPageRoutingModule {}
