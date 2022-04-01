import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Label } from 'src/app/interfaces/general/labels/label';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-grid-device',
  templateUrl: './grid-device.component.html',
  styleUrls: ['./grid-device.component.scss'],
})
export class GridDeviceComponent implements OnInit {
  @Input() deviceId: string | null = null;
  @Input() name: string | null = null;
  @Input() type: string | null = null;
  @Input() labels: Label[] | null = null;
  @Input() searchQuery: string | null = null;
  @Input() favourite: boolean | null = null;
  @Input() hubId: string | null = null;
  @Input() icon: string | null = null;
  @Output() addFavourite = new EventEmitter<any>();

  constructor(private router: Router, public platform: Platform, public authService: AuthService) { }

  ngOnInit() {}


  public addToFavourite() {
    this.addFavourite.emit({ id: this.deviceId, favourite: this.favourite });
  }

  public goToDevice(): void {
    this.router.navigate(['/' + this.type + '/' + this.deviceId], { fragment: this.hubId });
  }

}
