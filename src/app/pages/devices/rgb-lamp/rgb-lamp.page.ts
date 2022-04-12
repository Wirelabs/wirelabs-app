import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRouterOutlet, ModalController, NavController, PickerController } from '@ionic/angular';
import iro from '@jaames/iro';
import { CreateActionPage } from 'src/app/modals/create-action/create-action.page';
@Component({
  selector: 'app-rgb-lamp',
  templateUrl: './rgb-lamp.page.html',
  styleUrls: ['./rgb-lamp.page.scss'],
})
export class RgbLampPage implements OnInit {
  private deviceId: string;
  private hubId: string;
  public tab: string = "color";
  public usingRange: boolean = false;

  public listHubs = [];

  constructor( 
    private activeRoute: ActivatedRoute,
    private router: Router,
    private navController: NavController,
    private pickerController: PickerController,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.deviceId = params.deviceId;
    });

    this.activeRoute.fragment.subscribe((fragment) => {
      this.hubId = fragment;
    });
  }

  ngOnInit() {
    const colorPicker = iro.ColorPicker('#picker', {
      layout: [
        {
          component: iro.ui.Wheel,
          options: {},
        },
      ],
    });

    colorPicker.on('color:change', this.changeColor);
  }

  changeColor(color) {
    console.log(color.hexString);
  }


  public selectedEvent = undefined;
  public async eventPicker() {
    const pick = await this.pickerController.create({
      buttons: [
        {
          text: 'Confirm',
          handler: (selected) => {
            this.selectedEvent = selected.event.text;
          },
        }
      ],
      columns: [
        {
          name: 'event',
          options: [
            { text: 'Turn On', value: 'to' },
            { text: 'Turn Off', value: 'tof' },
            { text: 'Change Color', value: 'cc' },
          ]
        }
      ]
    });
    
    await pick.present();
  }

  public useRange(using: boolean): void {
    this.usingRange = using;
  }

  
  public async openActionModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateActionPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  public backToDevices(): void {
    this.navController.navigateBack('/device-overview/' + this.hubId);
  }
}
