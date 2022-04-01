import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceOverviewPageRoutingModule } from './device-overview-routing.module';

import { DeviceOverviewPage } from './device-overview.page';
import { GridDeviceComponent } from 'src/app/components/device/grid-device/grid-device.component';
import { ListDeviceComponent } from 'src/app/components/device/list-device/list-device.component';
import { SettingsPanelModule } from 'src/app/components/general/settings-panel/settings-panel.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceOverviewPageRoutingModule,
    SettingsPanelModule
  ],
  declarations: [DeviceOverviewPage, GridDeviceComponent, ListDeviceComponent]
})
export class DeviceOverviewPageModule {}
