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

  
  public divider(arr: any[], param: string): any[] {
    const list: any[] = [];
    let lastChar = '';
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      if (item[param].charAt(0) !== lastChar) {
        list.push({ name: item[param].charAt(0), letter: true });
        lastChar = item[param].charAt(0);
      }
      list.push(item);
    }
    return list;
  }

  public sort(arr: any[], param: string): any[] {
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
