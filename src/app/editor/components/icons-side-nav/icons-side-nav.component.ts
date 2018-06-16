import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icons-side-nav',
  templateUrl: './icons-side-nav.component.html',
  styleUrls: ['./icons-side-nav.component.scss'],
})
export class IconsSideNavComponent implements OnInit {
  @Output() toggleDirectory = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
