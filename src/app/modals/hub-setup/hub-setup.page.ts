import { Component, Input, OnInit } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { Wifi } from '@capacitor-community/wifi';
import {
  LoadingController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { HubService } from 'src/app/services/hub/hub.service';
import { McuService } from 'src/app/services/microcontroller/mcu.service';
import * as mongoose from 'mongoose';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hub-setup',
  templateUrl: './hub-setup.page.html',
  styleUrls: ['./hub-setup.page.scss'],
})
export class HubSetupPage implements OnInit {

  public credentialForm: FormGroup;

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private wifiWizard2: WifiWizard2,
    private mcuService: McuService,
    private hubService: HubService,
    private fb: FormBuilder
  ) {
    this.credentialForm = fb.group({
      name: ["", Validators.required],
      ssid: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  public async disconnectFromWifi() {
    const loading = await this.loadingController.create({
      message: 'Disconnecting with Hub',
    });

    await loading.present();

    // TODO Andoird
    this.wifiWizard2
      .iOSDisconnectNetwork((await Wifi.getSSID()).ssid)
      .then(async () => {
        await loading.dismiss();
        await this.modalController.dismiss();
      })
      .catch(async (err) => {
        await loading.dismiss();
        await this.createAlert('Failed to disconnect from Hub', err);
      });
  }

  private async createAlert(title: string, error: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: error,
      buttons: ['OK'],
    });
    await alert.present();
  }

  public async saveCredentials(event: any): Promise<void> {

    console.log(this.credentialForm);
    
    let name = this.credentialForm.controls.name.value;
    let ssid = this.credentialForm.controls.ssid.value;
    let password = this.credentialForm.controls.password.value;

    console.log(name);
    console.log(ssid);
    console.log(password);

    /*
    const loading = await this.loadingController.create({
      message: 'Setup new Hub',
    });

    await loading.present();

    // generate new ID
    const id = new mongoose.Types.ObjectId();

    console.log(id);

    await this.mcuService
      .sendWifiInformation(ssid, password, id.toString())
      .catch(async (err) => {
        await loading.dismiss();
        await this.createAlert('Error', err.message);
      });

    // TODO android
    await this.wifiWizard2.iOSDisconnectNetwork((await Wifi.getSSID()).ssid);

    this.hubService
      .generateNewHub(id.toString(), name)
      .pipe(take(1))
      .subscribe(async (res) => {
        console.log(res);
        await loading.dismiss();
        await this.createAlert('Success', 'Successfully created a new Hub');
        await this.modalController.dismiss();
      });*/
  }
}
