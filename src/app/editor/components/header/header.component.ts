import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { aceEditorThemes, setEditorTheme } from '../../../common/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() currentUser;
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
    setEditorTheme();
  }
  ngOnInit() {}
}
