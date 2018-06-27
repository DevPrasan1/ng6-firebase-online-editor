import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { aceEditorThemes } from '../../../ace-editor-themes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();
  @Output() onChangeTheme = new EventEmitter<string>();
  @Output() navigateTo = new EventEmitter<string>();
  themes = aceEditorThemes;
  theme = 'ace/theme/dracula';
  constructor() {}
  signout() {
    this.logout.emit();
  }
  changeTheme() {
    this.onChangeTheme.emit(this.theme);
  }
  ngOnInit() {}
}
