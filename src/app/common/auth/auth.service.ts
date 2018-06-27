import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _router: Router,
    private _auth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _loaderService: LoaderService,
  ) {}
  getUserDetails() {
    return JSON.parse(localStorage['fbUser']); //this._auth.auth.currentUser;
  }
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLoginProvider(provider, 'GOOGLE');
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    this.oAuthLoginProvider(provider, 'FACEBOOK');
  }
  oAuthLoginProvider(provider, providerType) {
    this._loaderService.show();
    this._auth.auth
      .signInWithPopup(provider)
      .then(credential => {
        // this._loaderService.hide();
        localStorage.setItem('fbUser', JSON.stringify(credential.user));
        this.updateUserInfo(credential.user, providerType);
      })
      .catch(err => {
        console.log(err);
        this._loaderService.hide();
      });
  }
  updateUserInfo(user, providerType) {
    this._afs
      .collection('users')
      .doc(user.uid)
      .set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: providerType,
        timestamp: new Date(),
      })
      .then(() => {
        // this._router.navigateByUrl('documents');
        window.location.href = '/#/documents';
      });
  }
  logout() {
    this._auth.auth
      .signOut()
      .then(() => {
        localStorage.setItem('fbUser', null);
        this._router.navigateByUrl('auth');
      })
      .catch(err => {
        this._loaderService.hide();
      });
  }
}
