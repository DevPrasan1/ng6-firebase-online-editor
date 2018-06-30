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
  allOpenFiles = [];
  loading = true;
  currentUser = null;
  showDirectory = true;
  theme = 'ace/theme/dracula';
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _filesService: FilesService,
    private _authService: AuthService,
    private _loaderService: LoaderService,
  ) {}

  openFile(file) {
    this.selectedFile = file;
    if (!this.allOpenFiles.find(f => f.id === file.id)) {
      this.allOpenFiles.push(file);
    }
  }
  closeFile(file) {
    this.allOpenFiles = this.allOpenFiles.filter(f => f.id !== file.id);
    this.selectedFile = this.allOpenFiles.length > 0 ? this.allOpenFiles[0] : null;
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
  navigateTo(path) {
    this._router.navigateByUrl(path);
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
          .subscribe((d: any) => {
            if (d) {
              this.currentUser = this._authService.getUserDetails();
              this.rootFolder = {
                id: folderId,
                ...d,
                parent: 'ROOT',
              };
            } else {
              this._router.navigateByUrl('documents');
            }
          });
      } else {
        this._router.navigateByUrl('documents');
      }
    });
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
