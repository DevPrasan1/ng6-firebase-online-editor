import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilesService } from '../../../common';

import { mockData } from '../../../ace-editor-themes';

@Component({
  selector: 'app-all-folders',
  templateUrl: './all-folders.component.html',
  styleUrls: ['./all-folders.component.scss'],
})
export class AllFoldersComponent implements OnInit, OnDestroy {
  _subscriptions = new Subscription();
  @Input() folder;
  @Input() selectedFile;
  @Output() onSelectFolder = new EventEmitter<any>();
  fileName = '';
  childern: any = [];
  showChildern = false;
  showInput = false;
  newFileType: string = null;
  isChildernSubscribed = false;
  loading = false;
  childernLoading = false;
  hasRenameSelected = false;
  folders: any = []; // mockData;
  subscribedFoldersIds = [];
  currentFolder: any = {};
  showPopover = false;
  popoverPosition = {
    left: '-500px',
    top: '-500px',
  };
  constructor(private _router: Router, private _filesService: FilesService) {}
  openFolder(folder) {
    if (folder.type === 'FOLDER') {
      this.currentFolder = folder;
      this.onSelectFolder.emit(folder);
      this.fetchChildern();
    }
  }
  openInEditor(folder = this.currentFolder) {
    console.log(folder);
    this._router.navigateByUrl(`editor/${folder.id}`);
  }
  currentPathFolders() {
    return this.folders.filter(f => f.parent === this.currentFolder.id);
  }
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
    const folderId = this.currentFolder.id;
    if (!this.subscribedFoldersIds.find(fId => fId === folderId)) {
      this.loading = true;
      this.subscribedFoldersIds.push(folderId);
      const sub = this._filesService
        .getFiles(folderId)
        .stateChanges()
        .subscribe(actions => {
          this.loading = false;
          actions.forEach(action => {
            if (action.type === 'added') {
              this.folders.push({
                id: action.payload.doc.id,
                ...action.payload.doc.data(),
              });
            } else if (action.type === 'modified') {
              this.folders = this.folders.map(
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
  }

  ngOnInit() {
    this.openFolder(this.folder);
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
