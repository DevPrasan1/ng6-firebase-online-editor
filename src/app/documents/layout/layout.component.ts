import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilesService, AuthService, LoaderService } from '../../common';
import { AllFoldersComponent } from '../components/all-folders/all-folders.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private _subscriptions = new Subscription();
  @ViewChild(AllFoldersComponent) allFolderComponent: AllFoldersComponent;
  rootFolder = null;
  selectedFile = null;
  loading = true;
  currentUser = null;
  showDirectory = true;
  showChildern = false;
  showInput = false;
  newFileType: string = null;
  isChildernSubscribed = false;
  childernLoading = false;
  hasRenameSelected = false;
  folder: any = {};
  folders: any = [];
  subscribedFoldersIds = [];
  currentFolder: any = {};
  currentFolderPath = [];

  constructor(
    private _filesService: FilesService,
    private _authService: AuthService,
    private _loaderService: LoaderService
  ) {}
  selectFolderFromPath(folder) {
    this.allFolderComponent.openFolder(folder);
  }
  setCurrentFolderPath(folder) {
    let currentFolderIndex = -1;
    for (let index in this.currentFolderPath) {
      const f = this.currentFolderPath[index];
      if (folder.id === f.id) {
        currentFolderIndex = +index;
        break;
      }
    }
    if (currentFolderIndex > -1) {
      this.currentFolderPath = this.currentFolderPath.slice(0, currentFolderIndex + 1);
    } else {
      this.currentFolderPath.push(folder);
    }
  }
  onRightClick(e) {
    this.allFolderComponent.onRightClick(e);
  }
  hide() {
    this.allFolderComponent.hide();
  }
  openFile(file) {
    this.selectedFile = file;
  }
  logout() {
    this._authService.logout();
  }
  toggleDirectory() {
    this.showDirectory = !this.showDirectory;
  }
  getUser() {
    //    parent: 'ZdQd13dl4qbAKkqLF08y1K9SMLF3'

    // this.rootFolder = {
    //   id: 'ZdQd13dl4qbAKkqLF08y1K9SMLF3',
    //   name: 'Root', //this.currentUser.displayName
    //   type: 'FOLDER',
    //   parent: 'ROOT'
    // };
    // this._loaderService.hide();
    const interval = setInterval(() => {
      this.currentUser = this._authService.getUserDetails();
      if (this.currentUser) {
        clearInterval(interval);
        this.rootFolder = {
          id: this.currentUser.uid,
          name: 'Documents', //this.currentUser.displayName
          type: 'FOLDER',
          parent: 'ROOT'
        };
        this._loaderService.hide();
      }
    }, 1000);
  }

  ngOnInit() {
    this.getUser();
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
