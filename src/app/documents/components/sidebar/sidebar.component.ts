import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() bookmarks = [];
  @Output() open = new EventEmitter<any>();
  @Output() removeBookmark = new EventEmitter<any>();
  constructor() {}
  do() {}
  ngOnInit() {}
}
