import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { DetailsCommandesComponent } from './pages/details-commandes/details-commandes.component';
import { FormCommandesComponent } from './pages/form-commandes/form-commandes.component';
import { CommandeEnCoursComponent } from './pages/commande-en-cours/commande-en-cours.component';
import { CommandeJourComponent } from './pages/commande-jour/commande-jour.component';
import { CommandeValideJourComponent } from './pages/commande-valide-jour/commande-valide-jour.component';
import { CommandeAnnuleeJourComponent } from './pages/commande-annulee-jour/commande-annulee-jour.component';
import { CommandeEnCoursJourComponent } from './pages/commande-en-cours-jour/commande-en-cours-jour.component';

const routes: Routes = [
  {path: '', component: CommandesComponent},
  {path: 'details/:id', component: DetailsCommandesComponent},
  {path: 'form', component: FormCommandesComponent},
  {path: 'updateCommande/:id', component: FormCommandesComponent},
  {path: 'en-cours', component: CommandeEnCoursComponent},
  {path: 'jour', component: CommandeJourComponent},
  {path: 'valide', component: CommandeValideJourComponent},
  {path: 'annulee', component: CommandeAnnuleeJourComponent },
  {path: 'en-cours-du-jour', component: CommandeEnCoursJourComponent},
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
