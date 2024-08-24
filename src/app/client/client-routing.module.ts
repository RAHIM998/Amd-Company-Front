import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { CategoryproductComponent } from './categoryproduct/categoryproduct.component';
import { DetailsProduitComponent } from './catalogue/details-produit/details-produit.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'apropos', component: AproposComponent},
  {path: 'category/:id', component: CategoryproductComponent },
  {path: 'produit/:id', component: DetailsProduitComponent },
  { path: 'panier', component: CartComponent },
  {path: 'layout', loadChildren:() => import('./layout/layout.module').then(m => m.LayoutModule) },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
