import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { FilesService } from '../../../common';

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
  editor = null;
  interval = null;
  showPopup = false;
  constructor(private _filesService: FilesService) {}

  ngOnInit() {
    this.autoSave();
  }
  ngAfterViewInit() {
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
    if (file && file.content !== this.editor.getValue()) {
      const content = this.editor.getValue();
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
    this.editor.setTheme('ace/theme/twilight');
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
      this.editor.gotoLine(1);
    }
  }
  ngOnDestroy() {
    this.saveFile();
    clearInterval(this.interval);
  }
}
