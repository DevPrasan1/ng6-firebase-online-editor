import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DocumentsRoutesModule } from './documents-routes-module';
import { LayoutComponent } from './layout/layout.component';
import { AllFoldersComponent } from './components/all-folders/all-folders.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLinksComponent } from './components/header-links/header-links.component';
import { FolderComponent } from './components/folder/folder.component';

@NgModule({
  imports: [CommonModule, DocumentsRoutesModule, FormsModule, ReactiveFormsModule],
  declarations: [LayoutComponent, AllFoldersComponent, SidebarComponent, HeaderComponent, FooterComponent, HeaderLinksComponent, FolderComponent]
})
export class DocumentsModule {}
