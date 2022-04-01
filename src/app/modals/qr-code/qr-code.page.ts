import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QrService } from 'src/app/services/qr-code/qr.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  @Input() imageUrl: string;

  constructor(
    private modalController: ModalController,
    private qrService: QrService
  ) {}

  ngOnInit() {}

  public closeModal(): void {
    this.modalController.dismiss();
  }
}
