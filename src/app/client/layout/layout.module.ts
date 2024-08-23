import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderClientComponent } from './header-client/header-client.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    HeaderClientComponent,
    FooterClientComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [
    HeaderClientComponent,
  ]
})
export class LayoutModule { }
