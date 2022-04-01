import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { LogicService } from 'src/app/services/general/logic/logic.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  public requestForm: FormGroup;
  constructor(public navController: NavController, public fb: FormBuilder, private menuCtrl: MenuController, private logicService: LogicService, private authService: AuthService) {
    this.requestForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  public goBackToLogin() : void {
    this.navController.navigateBack('/login');
  }

  public sendRequest(event: any) : void {
    if(!this.requestForm.valid) {
      return;
    }

    this.authService.forgotPassword(this.requestForm.controls.email.value).pipe(take(1)).subscribe(async response => {
      console.log(response);
      if(response.data) {
        await this.logicService.createAlert('Successfully sent e-mail', 'Success', ['Go back to login']);
        this.goBackToLogin();
      }else {
        await this.logicService.createAlert(response.error.error_message, response.error.error, ['OK']);
      }
    });
  }
}
