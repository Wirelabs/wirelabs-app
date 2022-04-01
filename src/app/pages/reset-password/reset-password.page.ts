import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { LogicService } from 'src/app/services/general/logic/logic.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
    public resetForm: FormGroup;
    public seePassword: boolean = false;
    private id: string = '';

    constructor(
        private menuCtrl: MenuController,
        private fb: FormBuilder,
        private navController: NavController,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private logicService: LogicService
    ) {
        this.activeRoute.params.subscribe((result) => {
            this.id = result.id;
        });

        this.resetForm = this.fb.group({
            password: ['', Validators.required],
        });
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    public resetPassword(event: any) {
        this.authService
            .resetPassword(this.id, this.resetForm.controls.password.value)
            .pipe(take(1))
            .subscribe(async (response) => {
                console.log(response);
                if (response.data) {
                    await this.logicService.createAlert(
                        'Successfully changed Password',
                        'Success',
                        ['OK']
                    );
                    this.navController.navigateBack('/login');
                } else {
                    await this.logicService.createAlert(
                        response.error.error_message,
                        response.error.error,
                        ['OK']
                    );
                }
            });
    }
}
