import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device/device.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.page.html',
  styleUrls: ['./device-overview.page.scss'],
})
export class DeviceOverviewPage implements OnInit {
  public hubId: string;
  public devices: any[] = undefined;
  public listDevices: any[] = [];
  public favourites: any[] = [];
  public mode = 'grid';
  public searchQuery = '';

  constructor(
    private navController: NavController,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) {
    activeRoute.params.subscribe((params) => {
      this.hubId = params.hubID;

      this.deviceService
        .getDevicesOfHub(this.hubId)
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res);
          if (res.data) {
            const fetchedDevices = res.data.hub.devices;

            // sort and generate list view
            this.devices = this.sort(fetchedDevices, 'name');
            this.listDevices = this.divider(
              this.sort(fetchedDevices, 'name'),
              'name'
            );

            for (let i = 0; i < this.devices.length; i++) {
              if (this.devices[i].favourite) {
                this.favourites.push(this.devices[i]);
                this.devices.splice(i, 1);
                i--;
              }
            }
          }
        });
    });
  }

  ngOnInit() {}

  public addToFavourite(event: any) {
    /*this.hubService
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
      });*/

    if (event.favourite) {
      for (let i = 0; i < this.favourites.length; i++) {
        if (this.favourites[i]._id === event.id) { // eslint-disable-line
          this.devices.push(this.favourites[i]);
          this.favourites.splice(i, 1);
          return;
        }
      }
    }

    for (let i = 0; i < this.devices.length; i++) {

      if (this.devices[i]._id === event.id) { // eslint-disable-line
        this.favourites.push(this.devices[i]);
        this.devices.splice(i, 1);
        return;
      }
    }
  }

  public changeSearchQuery(event: any): void {
    this.searchQuery = event;
  }

  public changeMode(event: any) {
    this.mode = event;
  }

  public backToHubs(): void {
    this.navController.navigateBack('/hub-overview');
  }

  private divider(arr: any[], param: string): any[] {
    const list: any[] = [];
    let lastChar = '';
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      if (item[param].charAt(0)  !== lastChar) {
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
