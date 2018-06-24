import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private _auth: AngularFireAuth, private _afs: AngularFirestore) {}

  getFiles(parent = 'ROOT') {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files', ref => ref.where('parent', '==', parent));
  }
  isFileAlreadyExistWithSameName(parent, fileName, fileType) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files', ref =>
        ref
          .where('parent', '==', parent)
          .where('name', '==', fileName)
          .where('type', '==', fileType)
      );
  }
  updateFileName(fileId, fileName) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files')
      .doc(fileId)
      .update({ name: fileName });
  }
  addNew(folder) {
    const uid = this._auth.auth.currentUser.uid;
    if (folder.type === 'FILE') {
      folder.content = '';
    }
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files')
      .add(folder);
  }
  addFile(parentFolderId, name) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files')
      .add({
        type: 'FILE',
        parent: parentFolderId,
        name: name,
        content: ''
      });
  }
  addFolder(parentFolderId, name) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files')
      .add({
        type: 'FOLDER',
        parent: parentFolderId,
        name: name
      });
  }
  updateFile(id, data) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files')
      .doc(id)
      .update(data);
  }
  delete(id) {
    const uid = this._auth.auth.currentUser.uid;
    return this._afs
      .collection('users')
      .doc(uid)
      .collection('files')
      .doc(id)
      .delete();
  }
}
