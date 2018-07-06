import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private _auth: AngularFireAuth, private _afs: AngularFirestore) {
    _afs.firestore.settings({ timestampsInSnapshots: true });
  }

  getFiles(parent = 'ROOT') {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs.collection(
      'files',
      ref => ref.where('parent', '==', parent).where('owner_id', '==', uid),
      //.orderBy('name', 'asc'),
    );
  }

  getFileById(fileId) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs.collection('files', ref => ref.where('owner_id', '==', uid)).doc(fileId);
  }

  isFileAlreadyExistWithSameName(parent, fileName, fileType) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs.collection('files', ref =>
      ref
        .where('parent', '==', parent)
        .where('name', '==', fileName)
        .where('type', '==', fileType)
        .where('owner_id', '==', uid),
    );
  }

  updateFileName(fileId, fileName) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('files')
      .doc(fileId)
      .update({ name: fileName });
  }

  addNew(folder) {
    const uid = this._auth.auth.currentUser.uid;
    if (folder.type === 'FILE') {
      folder.content = '';
    }
    folder.owner_id = uid;
    folder.timestamp = new Date();
    return this._afs.collection('files').add(folder);
  }

  updateFile(id, data) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('files')
      .doc(id)
      .update(data);
  }

  delete(id) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('files')
      .doc(id)
      .delete();
  }

  // bookmarks
  addBokmarks(fileId) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users-bookmarks')
      .doc(uid)
      .update({ [fileId]: true })
      .then(() => {})
      .catch(err => {
        if (err.code === 'not-found') {
          this._afs
            .collection('users-bookmarks')
            .doc(uid)
            .set({ [fileId]: true });
        }
      });
  }
  deleteBookmark(bookmarkId) {
    const uid = this._auth.auth.currentUser.uid;
    this._afs
      .collection('users-bookmarks')
      .doc(uid)
      .update({
        [bookmarkId]: firebase.firestore.FieldValue.delete(),
      });
  }
  getBookmarks() {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs.collection('users-bookmarks').doc(uid);
  }
}
