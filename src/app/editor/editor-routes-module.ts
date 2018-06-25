import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes = [
  {
    path: ':folderId',
    component: LayoutComponent,
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutesModule {}
