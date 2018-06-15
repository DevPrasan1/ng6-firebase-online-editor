import { Component, OnInit } from '@angular/core';
import { AuthService, LoaderService } from '../../common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor(private _authService: AuthService, private _loaderService: LoaderService) {}
  googleLogin() {
    this._authService.googleLogin();
  }
  facebookLogin(){
    this._authService.facebookLogin();
  }
  ngOnInit() {
    this._loaderService.hide();
  }
}
