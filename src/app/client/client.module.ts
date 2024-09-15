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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecuriteModule } from '../securite/securite.module';
import { RecapCommandeComponent } from './cart/pages/recap-commande/recap-commande.component';
import { MesCommandesComponent } from './cart/pages/mes-commandes/mes-commandes.component';
import { FormUserComponent } from './User/form-user/form-user.component';
import { UserComponent } from './User/user/user.component';
import { PayerCommandeComponent } from './aide/payer-commande/payer-commande.component';
import { SuivreCommandeComponent } from './aide/suivre-commande/suivre-commande.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    ImageSliderComponent,
    ContactComponent,
    AproposComponent,
    CategoryproductComponent,
    CatalogueComponent,
    DetailsProduitComponent,
    CartComponent,
    RecapCommandeComponent,
    MesCommandesComponent,
    UserComponent,
    FormUserComponent,
    PayerCommandeComponent,
    SuivreCommandeComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule,
    CarouselModule,
    ReactiveFormsModule,
    SecuriteModule,
    FormsModule
  ]
})
export class ClientModule { }
