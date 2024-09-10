import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './pages/produit/produit.component';
import { FormProduitComponent } from './pages/form-produit/form-produit.component';
import { DetailsProduitComponent } from './pages/details-produit/details-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ProduitComponent,
    FormProduitComponent,
    DetailsProduitComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],exports:[
    ProduitComponent,
    FormProduitComponent,
    DetailsProduitComponent,
  ]
})
export class ProduitModule { }
