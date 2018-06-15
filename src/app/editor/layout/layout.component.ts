import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilesService, AuthService, LoaderService } from '../../common';

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
  constructor(
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
  getUser() {
    const interval = setInterval(() => {
      this.currentUser = this._authService.getUserDetails();
      if (this.currentUser) {
        this.rootFolder = {
          id: this.currentUser.uid,
          name: this.currentUser.displayName,
          type: 'FOLDER',
          parent: 'ROOT',
        };
        this._loaderService.hide();
        clearInterval(interval);
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
