import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';


@NgModule({
  declarations: [
    NavbarAdminComponent,
    FooterAdminComponent,
    LayoutAdminComponent
  ],
  imports: [
    CommonModule,
    LayoutAdminRoutingModule
  ],
  exports: [
    NavbarAdminComponent,
    FooterAdminComponent,
    LayoutAdminComponent
  ]
})
export class LayoutAdminModule { }
