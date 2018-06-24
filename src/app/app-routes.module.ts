import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, AuthLoginGuardService } from './common';

const routes: Routes = [
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'documents',
    loadChildren: './documents/documents.module#DocumentsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    canActivate: [AuthLoginGuardService],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutesModule {}
