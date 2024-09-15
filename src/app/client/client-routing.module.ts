import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { CategoryproductComponent } from './categoryproduct/categoryproduct.component';
import { DetailsProduitComponent } from './catalogue/details-produit/details-produit.component';
import { CartComponent } from './cart/cart.component';
import { RecapCommandeComponent } from './cart/pages/recap-commande/recap-commande.component';
import { MesCommandesComponent } from './cart/pages/mes-commandes/mes-commandes.component';
import { UserComponent } from './User/user/user.component';
import { FormUserComponent } from './User/form-user/form-user.component';
import { PayerCommandeComponent } from './aide/payer-commande/payer-commande.component';
import { SuivreCommandeComponent } from './aide/suivre-commande/suivre-commande.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'apropos', component: AproposComponent},
  {path: 'category/:id', component: CategoryproductComponent },
  {path: 'produit/:id', component: DetailsProduitComponent },
  {path: 'panier', component: CartComponent},
  {path: 'recapCommande', component: RecapCommandeComponent },
  {path: 'mesCommande', component: MesCommandesComponent },
  {path: 'help/payerCommane', component: PayerCommandeComponent },
  {path: 'help/suivreCommande', component: SuivreCommandeComponent },
  {path: 'client/profile', component: UserComponent},
  {path: 'client/modifProfile/:id', component: FormUserComponent},
  {path: 'layout', loadChildren:() => import('./layout/layout.module').then(m => m.LayoutModule) },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
