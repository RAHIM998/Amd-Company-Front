import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuriteRoutingModule } from './securite-routing.module';
import { LayoutModule } from '../client/layout/layout.module';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    SecuriteRoutingModule,
    LayoutModule,
    ReactiveFormsModule,

  ],
  exports: [
    LoginComponent,
    InscriptionComponent
  ]
})
export class SecuriteModule { }
