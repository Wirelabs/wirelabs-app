import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Wifi } from '@capacitor-community/wifi';
//import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { Keyboard } from '@capacitor/keyboard';
import { take } from 'rxjs/operators';

import {
  AlertController,
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

@Component({
  selector: 'app-hub-overview',
  templateUrl: './hub-overview.page.html',
  styleUrls: ['./hub-overview.page.scss'],
})
export class HubOverviewPage implements OnInit {
  public hubs = undefined;
  public favouriteHubs = [];
  public listHubs = [];
  public searchQuery = '';

  public static readonly SSID: string = 'WireLabs Hub'; // eslint-disable-line
  public subscruptions : Subscription[]= [];
  public onMobile = false;
  public keyBoardActive = false;
  public mode = 'grid';

  constructor(
    private menuCtrl: MenuController,
    private wifiWizard2: WifiWizard2,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private hubService: HubService,
    private toastController: ToastController
  ) {
    this.routerOutlet.swipeGesture = false;
    this.onMobile = this.platform.is('ios') || this.platform.is('android');
  }

  public async ngOnInit() {
    const networkModal = await this.modalCtrl.create({
      component: HubSetupPage,
    });
    return await networkModal.present();
  }

  ionViewDidLeave() {
    this.subscruptions.forEach(subscription => { subscription.unsubscribe() });
    this.hubs = undefined;
    this.favouriteHubs = [];
    this.listHubs = [];
  }

  public ionViewWillEnter() {
    this.menuCtrl.enable(true);

    Keyboard.addListener('keyboardWillShow', (info) => {
      console.log('keyboard will show with height:', info.keyboardHeight);
      this.keyBoardActive = true;
      this.cdRef.detectChanges();
    });

    Keyboard.addListener('keyboardDidHide', () => {
      console.log('keyboard will hide');
      this.keyBoardActive = false;
      this.cdRef.detectChanges();
    });

    // fetch all user hubs from server
    this.subscruptions.push(this.hubService
      .getUserHubs()
      .pipe(take(1))
      .subscribe((res) => {
        if (res.data) {
          const fetchedHubs = res.data.hubs;

          // sort and generate list view
          this.hubs = this.sort(fetchedHubs, 'name');
          this.listHubs = this.divider(this.sort(fetchedHubs, 'name'), 'name');

          for (let i = 0; i < this.hubs.length; i++) {
            if (this.hubs[i].favourite) {
              this.favouriteHubs.push(this.hubs[i]);
              this.hubs.splice(i, 1);
              i--;
            }
          }

          console.log(this.hubs);

          console.log(this.listHubs);
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
          await toast.present();
        }
      });

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

  private divider(arr: any[], param: string): any[] {
    const list: any[] = [];
    let lastChar = '';
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      if (item[param].charAt(0) !== lastChar) {
        list.push({ name: item[param].charAt(0), letter: true });
        lastChar = item[param].charAt(0);
      }
      list.push(item);
    }
    return list;
  }

  private sort(arr: any[], param: string): any[] {
    return arr.sort((a, b) => {
      if (a[param] > b[param]) {
        return 1;
      } else if (a[param] < b[param]) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
