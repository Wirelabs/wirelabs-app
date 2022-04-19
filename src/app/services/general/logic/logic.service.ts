import { Injectable } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  public isCapacitor = false;

  constructor(private platform: Platform, private toastController: ToastController, private alertController: AlertController) {
    this.isCapacitor = platform.is("capacitor");
  }

  public async createAlert(message: string, title?: string, buttons?: string[]) : Promise<void> {

    console.log(this.platform.is('desktop'));

    if(this.platform.is('mobile') || this.platform.is('mobileweb')) {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: buttons,
      });
      return await alert.present();
    }

    if(this.platform.is('desktop')) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
      });

      return await toast.present();
    }
  }
}
