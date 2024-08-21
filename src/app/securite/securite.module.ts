import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuriteRoutingModule } from './securite-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';


@NgModule({
  declarations: [
    LoginComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    SecuriteRoutingModule
  ]
})
export class SecuriteModule { }
