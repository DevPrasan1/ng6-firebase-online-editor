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
  loading = false;
  folders: any = []; // mockData;
  subscribedFoldersIds = [];
  currentFolder: any = {};
  showPopover = false;
  popoverPosition = {
    left: '-500px',
    top: '-500px',
  };
  newFileFolder: any = {};
  constructor(private _router: Router, private _filesService: FilesService) {}
  openFolder(folder) {
    if (folder.type === 'FOLDER') {
      this.currentFolder = folder;
      this.onSelectFolder.emit(folder);
      this.fetchChildern();
    } else {
      this.openInEditor(folder);
    }
  }
  openInEditor(folder = this.currentFolder) {
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
  isFileAlreadyExist(fileName, type, cb) {
    const sub: Subscription = this._filesService
      .isFileAlreadyExistWithSameName(this.currentFolder.id, fileName, type)
      .valueChanges()
      .subscribe(data => {
        if (data && data.length > 0) {
          alert(`Same ${type.toLowerCase()} already exist`);
        } else {
          cb();
        }
        sub.unsubscribe();
      });
  }
  addNewFileToDb(fileName) {
    const { type } = this.newFileFolder;
    this.newFileFolder = {};
    if (fileName && fileName.length > 0 && type) {
      this.isFileAlreadyExist(fileName, type, () => {
        this.loading = true;
        this._filesService
          .addNew({
            name: fileName,
            type: type,
            parent: this.currentFolder.id,
          })
          .then(() => {
            this.loading = false;
          });
      });
    }
  }
  addFile() {
    this.newFileFolder = {
      id: 0,
      type: 'FILE',
      name: '',
    };
  }
  addFolder() {
    this.newFileFolder = {
      id: 0,
      type: 'FOLDER',
      name: '',
    };
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
              this.folders = this.folders.filter(f => f.id !== action.payload.doc.id);
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
