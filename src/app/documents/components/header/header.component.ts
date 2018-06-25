import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() path = [];
  @Output() onSelectFolderFromPath = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
}
