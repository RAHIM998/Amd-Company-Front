import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { FormCommandesComponent } from './pages/form-commandes/form-commandes.component';
import { DetailsCommandesComponent } from './pages/details-commandes/details-commandes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandeJourComponent } from './pages/commande-jour/commande-jour.component';
import { CommandeEnCoursComponent } from './pages/commande-en-cours/commande-en-cours.component';
import { CommandeValideJourComponent } from './pages/commande-valide-jour/commande-valide-jour.component';
import { CommandeAnnuleeJourComponent } from './pages/commande-annulee-jour/commande-annulee-jour.component';
import { CommandeEnCoursJourComponent } from './pages/commande-en-cours-jour/commande-en-cours-jour.component';


@NgModule({
  declarations: [
    CommandesComponent,
    FormCommandesComponent,
    DetailsCommandesComponent,
    CommandeJourComponent,
    CommandeEnCoursComponent,
    CommandeValideJourComponent,
    CommandeAnnuleeJourComponent,
    CommandeEnCoursJourComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],exports: [
    CommandesComponent,
    FormCommandesComponent,
    DetailsCommandesComponent,
    CommandeJourComponent,
    CommandeEnCoursComponent,
    CommandeValideJourComponent,
    CommandeAnnuleeJourComponent,
    CommandeEnCoursJourComponent
  ]
})
export class CommandeModule { }
