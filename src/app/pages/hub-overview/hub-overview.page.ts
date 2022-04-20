import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Wifi } from '@capacitor-community/wifi';
//import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { Keyboard } from '@capacitor/keyboard';
import { take } from 'rxjs/operators';
import { createAnimation, Animation } from '@ionic/core';

import {
  AlertController,
  AnimationController,
  IonRouterOutlet,
  LoadingController,
  MenuController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Label } from '../../interfaces/general/labels/label';
import { HubService } from '../../services/hub/hub.service';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { HubSetupPage } from '../../modals/hub-setup/hub-setup.page';
import { Subscription } from 'rxjs';
import { LogicService } from 'src/app/services/general/logic/logic.service';

@Component({
  selector: 'app-hub-overview',
  templateUrl: './hub-overview.page.html',
  styleUrls: ['./hub-overview.page.scss'],
})
export class HubOverviewPage {

  public hubs = undefined;
  public favouriteHubs = [];
  public listHubs = [];
  public searchQuery = '';

  public static readonly SSID: string = 'WireLabs Hub'; // eslint-disable-line
  public subscruptions : Subscription[] = [];
  public keyBoardActive = false;
  public mode = 'grid';

  constructor(
    private menuCtrl: MenuController,
    private wifiWizard2: WifiWizard2,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private cdRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private hubService: HubService,
    private toastController: ToastController,
    public logicService: LogicService,
    private animationCtrl: AnimationController
  ) {
    this.routerOutlet.swipeGesture = false;
  }

  public ionViewDidLeave() {
    this.subscruptions.forEach(subscription => { subscription.unsubscribe() });
    this.hubs = undefined;
    this.favouriteHubs = [];
    this.listHubs = [];
    this.mode = 'grid';
  }

  public ionViewWillEnter() {
    this.menuCtrl.enable(true);

    if(this.logicService.isCapacitor) {
      Keyboard.addListener('keyboardWillShow', (info) => {
        this.keyBoardActive = true;
        this.cdRef.detectChanges();
      });
  
      Keyboard.addListener('keyboardDidHide', () => {
        this.keyBoardActive = false;
        this.cdRef.detectChanges();
      });
    }

    // fetch all user hubs from server
    this.subscruptions.push(this.hubService
      .getUserHubs()
      .pipe(take(1))
      .subscribe((res) => {
        if (res.data) {
          const fetchedHubs = res.data.hubs;

          // sort and generate list view
          this.hubs = this.logicService.sort(fetchedHubs, 'name');
          this.listHubs = this.logicService.divider(this.logicService.sort(fetchedHubs, 'name'), 'name');

          this.favouriteHubs = this.hubs.filter(hub => hub.favourite == true);
          this.hubs = this.hubs.filter(hub => !this.favouriteHubs.includes(hub));
          
        }
      }));
  }

  public changeSearchQuery(event: any): void {
    this.searchQuery = event;
  }

  public changeMode(event: any) {
    this.mode = event;
  }

  public addToFavourite(event: any) {
    this.hubService
      .updateHub(event.id, { favourite: !event.favourite })
      .pipe(take(1))
      .subscribe(async (res) => {
        if (res.data) {

          const toast = await this.toastController.create({
            message: 'Successfully changed favourisation',
            duration: 1000,
          });
          toast.present();
          
          const dismissAnimation = this.animationCtrl.create()
          .addElement(document.getElementById(event.id))
          .duration(300)
          .fromTo('opacity', '1', '0').onFinish(() => {
            if (event.favourite) {
              for (let i = 0; i < this.favouriteHubs.length; i++) {
                if (this.favouriteHubs[i]._id === event.id) { // eslint-disable-line
                  this.hubs.push(this.favouriteHubs[i]);
                  this.favouriteHubs.splice(i, 1);
                  return;
                }
              }
            }
  
            for (let i = 0; i < this.hubs.length; i++) {
              if (this.hubs[i]._id === event.id) { // eslint-disable-line
                this.favouriteHubs.push(this.hubs[i]);
                this.hubs.splice(i, 1);
                return;
              }
            }
          });

          await dismissAnimation.play();
        }
      });    
  }

  public async findNewHub(): Promise<void> {
    /*
    let networkModal = await this.modalCtrl.create({
      component: NetworkSetupComponent,
    });
    return await networkModal.present();*/

    if (this.platform.is('ios')) {
      return await this.connectToWifiIOS();
    }

    if (this.platform.is('android')) {
      //return await this.connectToWifiAndroid();
    }
  }

  /*private async connectToWifiAndroid(): Promise<void> {
    try {
      await this.wifiWizard2.requestPermission();
    } catch (err) {
      return await this.createAlert(err, 'Please enable GPS to find a new Hub');
    }

    // let results: any[];
    // try {
    //   results = await this.wifiWizard2.scan();
    // } catch (err) {
    //   return await this.createAlert(err, 'An undefined error occured');
    // }

    // for (let network of results) {
    //   if (network.SSID.startsWith('Lukas')) {
    this.wifiWizard2
      .connect(this.SSID)
      .then(async (res) => {
        let networkModal = await this.modalCtrl.create({
          component: NetworkSetupComponent,
          componentProps: {
            ssid: this.SSID,
          },
        });
        return await networkModal.present();
      })
      .catch(async (err) => {
        return await this.createAlert(
          err,
          'Something went wrong while connecting'
        );
      });
    //   }
    // }
  }*/

  private async connectToWifiIOS() {
    await Geolocation.requestPermissions();
    /*WifiWizard2.getConnectedSSID().then(res => {
      this.name = res.SSID;
    }).catch(err => {
      this.name = err;
    });

    return;*/

    //await WifiWizard2.iOSDisconnectNetwork(await this.wifiWizard2.getConnectedBSSID());

    //this.name = (await Wifi.getSSID()).ssid;
    //return;
    const loading = await this.loadingController.create({
      message: 'Connecting with Hub',
    });

    try {
      await loading.present();

      await this.wifiWizard2
        .iOSConnectNetwork(HubOverviewPage.SSID, 'this_is_wirelabs')
        .then(async () => {
          await loading.dismiss();
        });

      const networkModal = await this.modalCtrl.create({
        component: HubSetupPage,
        componentProps: {
          ssid: HubOverviewPage.SSID,
        },
      });

      return await networkModal.present();
    } catch (err) {
      await loading.dismiss();
      return await this.createAlert(
        err,
        'Something went wrong while connecting'
      );
    }
  }

  private async createAlert(title: string, error: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: error,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
