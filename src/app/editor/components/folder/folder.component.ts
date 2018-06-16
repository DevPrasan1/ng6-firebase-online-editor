import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilesService } from '../../../common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit, OnDestroy {
  _subscriptions = new Subscription();
  @Input() folder;
  @Input() selectedFile;
  @Output() openFile = new EventEmitter<any>();
  fileName = '';
  childern: any = [];
  showChildern = false;
  showInput = false;
  newFileType: string = null;
  isChildernSubscribed = false;
  loading = false;
  childernLoading = false;
  hasRenameSelected = false;

  constructor(private _filesService: FilesService) {}
  onClick() {
    this.showChildern = !this.showChildern;
    if (!this.isChildernSubscribed) {
      this.fetchChildern();
    }
  }
  open(folder) {
    this.openFile.emit(folder);
  }
  isFileAlreadyExist(fileName, cb) {
    const sub: Subscription = this._filesService
      .isFileAlreadyExistWithSameName(this.folder.id, fileName, this.newFileType)
      .valueChanges()
      .subscribe(data => {
        if (data && data.length > 0) {
          alert(`Same ${this.newFileType.toLowerCase()} already exist`);
        } else {
          cb();
        }
        sub.unsubscribe();
      });
  }
  addNewFileToDb(fileName, form) {
    this.isFileAlreadyExist(fileName, () => {
      this.loading = true;
      this._filesService
        .addNew({
          name: fileName,
          type: this.newFileType,
          parent: this.folder.id,
        })
        .then(() => {
          this.loading = false;
          if (!this.showChildern) {
            this.fetchChildern();
          }
        });
      form.reset();
      this.showInput = false;
    });
  }
  updateFileName(fileName, form) {
    this._filesService.updateFileName(this.folder.id, fileName).then(() => {
      form.reset();
      this.loading = false;
      this.showInput = false;
      this.hasRenameSelected = false;
      this.newFileType = '';
    });
  }
  onSubmit(form) {
    let fileName = form.value.fileName.trim();
    if (this.newFileType === 'FILE') {
      fileName = fileName.replace(' ', '');
    } else {
      fileName = fileName.replace('  ', ' ');
    }
    if (fileName) {
      if (!this.loading) {
        if (this.hasRenameSelected) {
          this.updateFileName(fileName, form);
        } else {
          this.addNewFileToDb(fileName, form);
        }
      }
    }
  }
  toogleInput() {
    this.showInput = !this.showInput;
  }
  hideInput() {
    this.showInput = false;
    this.hasRenameSelected = false;
    this.newFileType = '';
  }
  addFile() {
    this.newFileType = 'FILE';
    this.toogleInput();
  }
  addFolder() {
    this.newFileType = 'FOLDER';
    this.toogleInput();
  }
  renameFile() {
    this.hasRenameSelected = true;
    this.fileName = this.folder.name;
    this.newFileType = this.folder.type;
    this.toogleInput();
  }
  delete() {
    const txtMsg = `Are you sure to delete "${this.folder.name}"?`;
    const res = confirm(txtMsg);
    if (res) {
      const sub = this._filesService
        .getFiles(this.folder.id)
        .snapshotChanges()
        .subscribe(actions => {
          this.childernLoading = null;
          actions.forEach(action => {
            this._filesService.delete(action.payload.doc.id);
          });
          this._filesService.delete(this.folder.id);
          this.folder = null;
          this._subscriptions.unsubscribe();
        });
      this._subscriptions.add(sub);
    }
  }
  fetchChildern() {
    this.childern = [];
    this.isChildernSubscribed = true;
    this.childernLoading = true;
    const sub = this._filesService
      .getFiles(this.folder.id)
      .stateChanges()
      .subscribe(actions => {
        this.childernLoading = null;
        actions.forEach(action => {
          if (action.type === 'added') {
            this.childern.push({
              id: action.payload.doc.id,
              ...action.payload.doc.data(),
            });
          } else if (action.type === 'modified') {
            this.childern = this.childern.map(
              f =>
                f.id === action.payload.doc.id
                  ? {
                      id: action.payload.doc.id,
                      ...action.payload.doc.data(),
                    }
                  : f,
            );
          } else if (action.type === 'removed') {
            this.folder = null;
          }
        });
      });
    this._subscriptions.add(sub);
  }

  ngOnInit() {}
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
