import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Label } from 'src/app/interfaces/general/labels/label';

@Component({
  selector: 'app-grid-hub',
  templateUrl: './grid-hub.component.html',
  styleUrls: ['./grid-hub.component.scss'],
})
export class GridHubComponent implements OnInit {
  @Input() id: string | null = null;
  @Input() name: string | null = null;
  @Input() status: string | null = null;
  @Input() labels: Label[] | null = null;
  @Input() searchQuery: string | null = null;
  @Input() favourite: boolean | null = null;
  @Output() addFavourite = new EventEmitter<any>();

  constructor(public router: Router, public platform: Platform,public actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  public goToDevices(): void {
    if(this.status === 'active') {
      this.router.navigate(['/device-overview/' + this.id]);
    }
  }

  public addToFavourite() {
    this.addFavourite.emit({ id: this.id, favourite: this.favourite });
  }

  public async openOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash-outline',
        handler: () => {
          console.log('Delete clicked ' + this.id);
        }
      }, {
        text: 'Configure',
        icon: 'cog-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
