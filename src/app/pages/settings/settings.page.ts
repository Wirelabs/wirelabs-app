import { Component, OnInit, Renderer2 } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public darkModeEnabled = false;
  public selectedTheme = '';
  constructor(private renderer: Renderer2) {
    this.darkModeEnabled = JSON.parse(localStorage.getItem('darkMode'));
    this.selectedTheme = localStorage.getItem('theme');
  }

  ngOnInit() {
  }

  public toggleThemMode(): void {
    console.log(this.darkModeEnabled);
    localStorage.setItem('darkMode', String(this.darkModeEnabled));

    if(this.darkModeEnabled) {
      StatusBar.setStyle({ style: Style.Dark });
    }else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      StatusBar.setStyle({ style: Style.Light });
    }
  }
  
  public selectTheme(event: any) {
    localStorage.setItem('theme', event.detail.value);
    this.renderer.setAttribute(document.body, 'color-theme', event.detail.value);

    if(event.detail.value === 'dark') {
      StatusBar.setStyle({ style: Style.Dark });
    }else {
      StatusBar.setStyle({ style: Style.Light });
    }
  }

}
