import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonDatetime,
  IonRouterOutlet,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { format, formatISO, parseISO } from 'date-fns';
import { take } from 'rxjs/operators';
import { QrCodePage } from '../../modals/qr-code/qr-code.page';
import { DeviceService } from '../../services/device/device.service';
import { QrService } from '../../services/qr-code/qr.service';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.page.html',
  styleUrls: ['./qr-code-generator.page.scss'],
})
export class QrCodeGeneratorPage implements OnInit {

  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  public today: string = new Date().toISOString().slice(0, 10);
  public selectedDate: string = undefined || this.today;
  public hubs = undefined;
  private selectedDateISO: string;

  constructor(
    public routerOutlet: IonRouterOutlet,
    private qrService: QrService,
    private modalController: ModalController,
    private deviceService: DeviceService,
    private loadingController: LoadingController
  ) {
    this.deviceService
      .getAllDevices()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);

        const hubs = res.data.hub;
        for (const hub of hubs) {
          hub.permission = false;
          hub.allDevices = false;
          hub.allDeviceModel = false;

          for (const device of hub.devices) {
            device.permission = false;
          }
        }

        this.hubs = hubs;
      });
  }

  ngOnInit() {}

  confirm() {
    this.datetime.confirm();
  }

  reset() {
    this.datetime.reset();
  }

  public changeDateTime(time: any): void {
    const formattedDateValue = format(parseISO(time), 'dd.MM.yyyy - HH:mm');
    this.selectedDate = formattedDateValue;
    this.selectedDateISO = time;
  }

  public activateDevice(event: any, hubId: string, id: string): void {
    const hub = this.hubs.find((ele) => ele._id === hubId); // eslint-disable-line
    const device = hub.devices.find((ele) => ele._id === id); // eslint-disable-line

    device.permission = event.detail.checked;

    hub.permission = false;
    let count = 0;
    for (const deviceItem of hub.devices) {
      if (deviceItem.permission) {
        hub.permission = true;
        count++;
      }
    }

    hub.allDevices = hub.allDeviceModel = hub.devices.length === count;
  }

  public activateAll(event: any, id: string): void {
    const hub = this.hubs.find((ele) => ele._id === id); // eslint-disable-line

    if (hub.allDevices === event.detail.checked) {
      return;
    }

    hub.allDevices = event.detail.checked;
    hub.permission = event.detail.checked;

    for (const device of hub.devices) {
      device.permission = event.detail.checked;
    }
  }

  public async createQRCode(): Promise<void> {
    console.log('test');

    const loading = await this.loadingController.create({
      message: 'Generating QR-Code',
    });

    await loading.present();

    let permissionHubs: any[] = [];
    for(let hub of this.hubs) {
      if(hub.permission) {
        let hubClone = JSON.parse(JSON.stringify(hub));
        for(let i = 0; i < hubClone.devices.length; i++) {
          if(!hubClone.devices[i].permission) {
            hubClone.devices.splice(i, 1);
            i--;
          }
        }
        permissionHubs.push(hubClone);
      }
    }

    console.log(permissionHubs);

    this.qrService
      .generateQrCode(permissionHubs)
      .pipe(take(1))
      .subscribe(async (res) => {
        console.log(await res);
        await loading.dismiss();
        if (res.data) {
          const modal = await this.modalController.create({
            component: QrCodePage,
            componentProps: {
              imageUrl: res.data.url,
            },
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
          });
          return await modal.present();
        }
      });
  }
}
