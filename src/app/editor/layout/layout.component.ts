import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilesService, AuthService, LoaderService } from '../../common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private _subscriptions = new Subscription();
  rootFolder = null;
  selectedFile = null;
  loading = true;
  currentUser = null;
  showDirectory = true;
  theme = 'ace/theme/dracula';
  constructor(
    private _route: ActivatedRoute,
    private _filesService: FilesService,
    private _authService: AuthService,
    private _loaderService: LoaderService,
  ) {}

  openFile(file) {
    this.selectedFile = file;
  }
  logout() {
    this._authService.logout();
  }
  changeTheme(theme) {
    this.theme = theme;
  }
  toggleDirectory() {
    this.showDirectory = !this.showDirectory;
  }
  getUser() {
    const interval = setInterval(() => {
      this.currentUser = this._authService.getUserDetails();
      if (this.currentUser) {
        this.rootFolder = {
          id: this.currentUser.uid,
          name: 'Documents', //this.currentUser.displayName
          type: 'FOLDER',
          parent: 'ROOT',
        };
        this._loaderService.hide();
        clearInterval(interval);
      }
    }, 1000);
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      const folderId = params['folderId'];
      if (folderId) {
        this.rootFolder = null;
        this._filesService
          .getFileById(folderId)
          .valueChanges()
          .subscribe(d => {
            this.currentUser = this._authService.getUserDetails();
            this.rootFolder = {
              id: folderId,
              ...d,
              parent: 'ROOT',
            };
          });
      } else {
        this.getUser();
      }
    });
    //this.getUser();
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
