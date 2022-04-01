import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
})
export class SettingsPanelComponent implements OnInit {

  @Output() changeSearch = new EventEmitter<string>();
  @Output() changeMode = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  public changeInput(event: any): void {
    this.changeSearch.emit(event.detail.value);
  }

  public setMode(event: any): void {
    this.changeMode.emit(event.detail.value);
  }
}
