import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './pages/produit/produit.component';
import { DetailsProduitComponent } from './pages/details-produit/details-produit.component';
import { FormProduitComponent } from './pages/form-produit/form-produit.component';

const routes: Routes = [
  {path: '', component: ProduitComponent},
  {path: 'details/:id', component: DetailsProduitComponent},
  {path: 'form', component: FormProduitComponent},
  {path: 'updateProduct/:id', component: FormProduitComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
