import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  @Input() folder;
  @Output() openFolder = new EventEmitter<any>();
  @Output() openInEditor = new EventEmitter<any>();
  showPopover = false;
  popoverPosition = {
    left: '-500px',
    top: '-500px',
  };
  constructor() {}
  open() {
    this.openFolder.emit(this.folder);
  }
  do() {}
  hide() {
    this.showPopover = false;
    this.popoverPosition = {
      left: '-500px',
      top: '-500px',
    };
  }
  onRightClick(e) {
    this.popoverPosition = {
      top: e.clientY + 'px',
      left: e.clientX + 'px',
    };
    this.showPopover = true;
    e.stopPropagation();
    e.preventDefault();
  }
  ngOnInit() {}
}
