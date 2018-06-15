import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutesModule } from './auth-routes-module';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  imports: [CommonModule, AuthRoutesModule],
  declarations: [AuthLayoutComponent],
})
export class AuthModule {}
