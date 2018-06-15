import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorRoutesModule } from './editor-routes-module';

import { LayoutComponent } from './layout/layout.component';
import { IconsSideNavComponent } from './components/icons-side-nav/icons-side-nav.component';
import { DirectorySideNavComponent } from './components/directory-side-nav/directory-side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { FolderComponent } from './components/folder/folder.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EditorRoutesModule],
  declarations: [
    LayoutComponent,
    IconsSideNavComponent,
    DirectorySideNavComponent,
    HeaderComponent,
    FooterComponent,
    TextEditorComponent,
    FolderComponent,
  ],
})
export class EditorModule {}
