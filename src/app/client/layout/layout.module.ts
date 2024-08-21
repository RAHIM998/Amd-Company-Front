import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderClientComponent } from './pages/header-client/header-client.component';
import { FooterClientComponent } from './pages/footer-client/footer-client.component';


@NgModule({
  declarations: [
    HeaderClientComponent,
    FooterClientComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
