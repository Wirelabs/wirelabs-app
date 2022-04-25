import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import QRCodeStyling from 'qr-code-styling';
import { QrService } from 'src/app/services/qr-code/qr.service';

@Component({
    selector: 'app-qr-code',
    templateUrl: './qr-code.page.html',
    styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
    @Input() data: string;

    constructor(
        private modalController: ModalController
    ) {}

    ngOnInit() {

      let color: string = '#000000'

      if(localStorage.getItem('theme') === 'dark') {
        color = '#FFFFFF';
      }

        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            type: 'svg',
            data: this.data,
            image: '/assets/icon/logo_icon.png',
            dotsOptions: {
                color: color,
                type: 'dots',
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: color,
            },
            cornersDotOptions: {
                type: 'dot',
                color: '#3880ff',
            },
            backgroundOptions: {
                color: 'transparent',
            },
            imageOptions: {
                crossOrigin: 'anonymous',
            },
            margin: 5,
        });

        qrCode.append(document.getElementById('canvas'));
    }

    public closeModal(): void {
        this.modalController.dismiss();
    }
}
