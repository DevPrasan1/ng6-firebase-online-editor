import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FilesService } from '../../../common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  @ViewChild('textInput') textInput: ElementRef;
  @Input() folder;
  @Input() newFileType = null;
  @Output() openFolder = new EventEmitter<any>();
  @Output() openInEditor = new EventEmitter<any>();
  @Output() addNew = new EventEmitter<any>();
  loading = false;
  showPopover = false;
  showInput = false;
  popoverPosition = {
    left: '-500px',
    top: '-500px',
  };
  fileName = '';
  constructor(private _filesService: FilesService) {}
  open() {
    this.openFolder.emit(this.folder);
  }
  toggleInput(show = true) {
    this.hide();
    this.showInput = show;
    if (show) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 100);
    }
  }
  delete() {
    const txtMsg = `Are you sure to delete "${this.folder.name}"?`;
    const res = confirm(txtMsg);
    if (res) {
      if (this.folder.type === 'FOLDER') {
        this._filesService
          .getFiles(this.folder.id)
          .snapshotChanges()
          .pipe(first())
          .subscribe(actions => {
            actions.forEach(action => {
              this._filesService.delete(action.payload.doc.id);
            });
            this._filesService.delete(this.folder.id);
          });
      } else {
        this._filesService.delete(this.folder.id);
      }
    }
  }
  onSubmit(form) {
    let fileName = form.value.fileName.trim();
    if (this.folder.type === 'FILE') {
      fileName = fileName.replace(' ', '');
    } else {
      fileName = fileName.replace('  ', ' ');
    }
    if (this.folder.id === 0) {
      this.addNew.emit(fileName);
    } else {
      if (fileName) {
        this._filesService.updateFileName(this.folder.id, fileName);
      }
    }
    this.showInput = false;
    this.fileName = fileName;
  }
  do() {}
  addBookmark() {
    this._filesService.addBokmarks(this.folder.id);
    this.hide();
  }
  hide() {
    this.showPopover = false;
    this.popoverPosition = {
      left: '-500px',
      top: '-500px',
    };
  }
  onRightClick(e) {
    this.hide();
    this.popoverPosition = {
      top: e.clientY + 'px',
      left: e.clientX + 'px',
    };
    this.showPopover = true;
    e.stopPropagation();
    e.preventDefault();
  }

  ngOnInit() {
    this.fileName = this.folder.name;
    if (this.folder.id === 0) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 100);
    }
  }
}
