import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { LayoutModule } from './layout/layout.module';
import { CategoryproductComponent } from './categoryproduct/categoryproduct.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsProduitComponent } from './catalogue/details-produit/details-produit.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [ 
    HomeComponent,
    ImageSliderComponent,
    ContactComponent,
    AproposComponent,
    CategoryproductComponent,
    CatalogueComponent,
    DetailsProduitComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule,
    CarouselModule
  ]
})
export class ClientModule { }
