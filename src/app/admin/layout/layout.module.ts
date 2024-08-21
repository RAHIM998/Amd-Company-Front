import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';



@NgModule({
  declarations: [
    HeaderAdminComponent,
    FooterAdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
