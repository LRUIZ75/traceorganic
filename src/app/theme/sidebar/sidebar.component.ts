import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { SettingsService, User } from '@core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = false; //controlado desde AppSettings
  @Input() showHeader = true; //Controla el header con el branding, desde AppSettings
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(settings: SettingsService) {
    this.showUser = settings.getOptions().showUserPanel;
    this.showHeader = settings.getOptions().showHeader;
  }
}
