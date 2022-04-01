import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HubOverviewPageRoutingModule } from './hub-overview-routing.module';

import { HubOverviewPage } from './hub-overview.page';
import { SettingsPanelComponent } from 'src/app/components/general/settings-panel/settings-panel.component';
import { ListHubComponent } from 'src/app/components/hub/list-hub/list-hub.component';
import { GridHubComponent } from 'src/app/components/hub/grid-hub/grid-hub.component';
import { SettingsPanelModule } from 'src/app/components/general/settings-panel/settings-panel.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HubOverviewPageRoutingModule,
    ReactiveFormsModule,
    SettingsPanelModule
  ],
  declarations: [HubOverviewPage, ListHubComponent, GridHubComponent],
})
export class HubOverviewPageModule {}
