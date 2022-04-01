import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import iro from '@jaames/iro';
@Component({
  selector: 'app-rgb-lamp',
  templateUrl: './rgb-lamp.page.html',
  styleUrls: ['./rgb-lamp.page.scss'],
})
export class RgbLampPage implements OnInit {
  private deviceId: string;
  private hubId: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private navController: NavController
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

  public backToDevices(): void {
    this.navController.navigateBack('/device-overview/' + this.hubId);
  }
}
