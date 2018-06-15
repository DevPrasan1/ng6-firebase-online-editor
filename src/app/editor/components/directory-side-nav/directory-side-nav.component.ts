import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-directory-side-nav',
  templateUrl: './directory-side-nav.component.html',
  styleUrls: ['./directory-side-nav.component.scss'],
})
export class DirectorySideNavComponent implements OnInit {
  @Input() rootFolder;
  @Input() selectedFile;
  @Output() openFile = new EventEmitter<any>();

  constructor() {}

  open(file) {
    this.openFile.emit(file);
  }
  ngOnInit() {}
}
