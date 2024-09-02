import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderClientComponent } from './header-client/header-client.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SearchPageComponent } from './search-page/search-page.component';


@NgModule({
  declarations: [
    HeaderClientComponent,
    FooterClientComponent,
    LayoutComponent,
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,

  ],
  exports: [
    HeaderClientComponent,
    FooterClientComponent,
  ]
})
export class LayoutModule { }
