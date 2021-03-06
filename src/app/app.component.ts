import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { AuthService } from './services/authentication/auth.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { LogicService } from './services/general/logic/logic.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public appPages = [
        { title: 'Hub Overview', url: '/hub-overview', icon: 'home' },
        {
            title: 'QR Code',
            url: '/qr-code-generator',
            icon: 'qr-code',
            role: 'USER',
        },
        {
            title: 'Personal Informations',
            url: '/personal-information',
            icon: 'person',
            role: 'USER',
        },
        { title: 'Settings', url: '/settings', icon: 'settings' },
    ];
    public labels = undefined;
    // public labels = ['News', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor(
        private renderer: Renderer2,
        public authService: AuthService,
        private router: Router,
        private logicService: LogicService,
        private network: Network,
        private platform: Platform
    ) {
        let selectedTheme : string = localStorage.getItem('theme'); 
        this.renderer.setAttribute(document.body, 'color-theme', selectedTheme);
        if (logicService.isCapacitor) {
            if (selectedTheme === 'dark') {
                StatusBar.setStyle({ style: Style.Dark });
            } else {
                StatusBar.setStyle({ style: Style.Light });
            }

            Keyboard.setAccessoryBarVisible({ isVisible: true });
        }
        
        window.addEventListener('offline', () => {
          console.log("hell");
        });

        this.platform.ready().then(() => {
          console.log(network.type);

        });

        this.authService.refreshRole();
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.authService.isAuthorized = false;
        this.router.navigate(['login']);
    }
}
