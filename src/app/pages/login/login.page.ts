import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import {
    BarcodeScanner,
    SupportedFormat,
} from '@capacitor-community/barcode-scanner';
import { QrService } from 'src/app/services/qr-code/qr.service';
import { take } from 'rxjs/operators';
import { LogicService } from 'src/app/services/general/logic/logic.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public errorMessage = '';
    public firstActivation = true;
    public scanActive = false;

    constructor(
        private menuCtrl: MenuController,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private renderer: Renderer2,
        private qrService: QrService,
        public logicService: LogicService
    ) {
        this.authService
            .checkAuthenticated()
            .pipe(take(1))
            .subscribe((result) => {
                if (result.data) {
                    router.navigate(['/hub-overview']);
                }
            });

        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });

        this.firstActivation = Boolean(localStorage.getItem('activated')) || false;
        localStorage.setItem('activated', "true");
        

    }

    async ngOnInit() {}

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
        if(this.logicService.isCapacitor) {
            BarcodeScanner.prepare();
        }
    }

    public async startScanner(): Promise<void> {
        const permission = await BarcodeScanner.checkPermission({
            force: true,
        });

        if (permission.granted) {
            this.scanActive = true;
            this.renderer.setAttribute(document.body, 'color-theme', 'light');
            await BarcodeScanner.hideBackground();
            const result = await BarcodeScanner.startScan({
                targetedFormats: [SupportedFormat.QR_CODE],
            });
            if (result.hasContent) {
                console.log(result.content);
                this.errorMessage = result.content;
                await BarcodeScanner.showBackground();
                await BarcodeScanner.stopScan();

                this.qrService
                    .checkQrCode(result.content)
                    .pipe(take(1))
                    .subscribe((result) => {
                        if (result.data) {
                            localStorage.setItem('token', result.data.token);
                            this.authService.isAuthorized = true;
                            this.router.navigate(['/hub-overview']);
                            this.authService.refreshRole();
                        } else {
                            this.errorMessage = 'invalid_qr_code';
                        }
                    });

                this.scanActive = false;
                if (JSON.parse(localStorage.getItem('darkMode'))) {
                    this.renderer.setAttribute(
                        document.body,
                        'color-theme',
                        'dark'
                    );
                }
            }
        } else {
            this.errorMessage = 'bre';
        }
    }

    public async login($event: any) {
        this.authService
            .login(
                this.loginForm.controls.email.value,
                this.loginForm.controls.password.value
            )
            .pipe(take(1))
            .subscribe((response) => {
                console.log(response);
                if (response.data) {
                    localStorage.setItem('token', response.data.token);
                    this.authService.isAuthorized = true;
                    this.authService.refreshRole();
                    this.router.navigate(['/hub-overview']);
                } else {
                    console.log('PRINT OUT ERROR!');
                }
            });
    }
}
