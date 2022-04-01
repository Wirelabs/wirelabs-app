import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.scss'],
})
export class ListDeviceComponent implements OnInit {
  @Input() deviceId: string | null = null;
  @Input() name: string | null = null;
  @Input() type: string | null = null;
  @Input() searchQuery: string | null = null;
  @Input() hubId: string | null = null;
  @Input() icon: string | null = null;
  @Input() letter: boolean | null = null;

  constructor(private router: Router) { }

  ngOnInit() {}

  public goToDevice(): void {
    this.router.navigate(['/' + this.type + '/' + this.deviceId], { fragment: this.hubId });
  }
}
