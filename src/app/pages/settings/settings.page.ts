import { Component, OnInit, Renderer2 } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public darkModeEnabled = false;

  constructor(private renderer: Renderer2) {
    this.darkModeEnabled = JSON.parse(localStorage.getItem('darkMode'));

  }

  ngOnInit() {
    console.log(localStorage.getItem('darkMode'));
  }

  public toggleThemMode(): void {
    console.log(this.darkModeEnabled);
    localStorage.setItem('darkMode', String(this.darkModeEnabled));

    if(this.darkModeEnabled) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      StatusBar.setStyle({ style: Style.Dark });
    }else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      StatusBar.setStyle({ style: Style.Light });
    }
  }

}
