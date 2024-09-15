import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './pages/user/user.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { DetailsUserComponent } from './pages/details-user/details-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    FormUserComponent,
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserComponent,
    FormUserComponent,
    DetailsUserComponent
    ]
})
export class UserModule { }
