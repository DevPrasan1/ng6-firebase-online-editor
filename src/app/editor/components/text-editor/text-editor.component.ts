import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { FilesService } from '../../../common';
import { setEditorTheme } from '../../../common/util';
declare var ace: any;
const extensions = {
  js: 'javascript',
  py: 'python',
  ts: 'typescript',
};

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() selectedFile;
  @Input() theme = 'ace/theme/dracula';
  editor = null;
  interval = null;
  showPopup = false;
  oldFileName = '';
  constructor(private _filesService: FilesService) {}

  ngOnInit() {
    //this.autoSave();
  }
  ngAfterViewInit() {
    setEditorTheme();
    document.getElementById('editor').style.fontSize = '16px';
    this.editor.setShowPrintMargin(false);
    // this.editor.insert(data);
    this.editor.on('change', delta => {
      // console.log('change', delta);
    });
    this.editor.on('changeSelectionStyle', delta => {
      // console.log('changeSelectionStyle', delta);
    });
  }
  saveFile(file = this.selectedFile) {
    const beautify = ace.require('ace/ext/beautify'); // get reference to extension
    beautify.beautify(this.editor.session);

    if (file && file.content !== this.editor.getValue()) {
      const content = this.editor.getValue();
      this.oldFileName = file.name;
      this.showPopUp();
      this._filesService
        .updateFile(file.id, {
          content,
        })
        .then(() => {
          // alert('file updated');
          file.content = content;
        });
    }
  }
  autoSave() {
    this.interval = setInterval(() => {
      this.saveFile();
    }, 3000);
  }
  showPopUp() {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 1500);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.editor = ace.edit('editor');
    this.editor.setTheme(this.theme);
    this.editor.session.setTabSize(4);
    const selectedFileChange = changes['selectedFile'];
    if (selectedFileChange) {
      this.saveFile(selectedFileChange.previousValue);
      this.selectedFile = selectedFileChange.currentValue;
      if (this.selectedFile) {
        const exts = this.selectedFile.name.split('.');
        let ext = exts[exts.length - 1];
        ext = extensions[ext] ? extensions[ext] : ext;
        this.editor.session.setMode(`ace/mode/${ext}`);
      }
      const data = this.selectedFile && this.selectedFile.content ? this.selectedFile.content : '';
      this.editor.setValue(data);
      this.editor.getSession().setUndoManager(new ace.UndoManager());
      this.editor.gotoLine(2);
    }
    this.editor.setOptions({
      enableBasicAutocompletion: true,
    });
    // this.editor.session.setUseWrapMode(true);
  }
  ngOnDestroy() {
    this.saveFile();
    clearInterval(this.interval);
  }
}
