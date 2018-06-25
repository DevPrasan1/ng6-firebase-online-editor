import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router, private _auth: AngularFireAuth) {}
  canActivate(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localStorage['fbUser'] && JSON.parse(localStorage['fbUser'])) {
          resolve(true);
        } else {
          this._router.navigate(['auth']);
          reject(false);
        }
      }, 2500);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuardService implements CanActivate {
  constructor(private _router: Router, private _auth: AngularFireAuth) {}
  canActivate(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!localStorage['fbUser'] ||  !JSON.parse(localStorage['fbUser'])) {
          resolve(true);
        } else {
          this._router.navigate(['documents']);
          reject(false);
        }
      }, 2500);
    });
  }
}
