import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './pages/payment/payment.component';
import { DetailsPaymentComponent } from './pages/details-payment/details-payment.component';
import { PaiementJoursComponent } from './pages/paiement-jours/paiement-jours.component';
import { PaiementEnAttenteComponent } from './pages/paiement-en-attente/paiement-en-attente.component';

const routes: Routes = [
  {path: '', component: PaymentComponent},
  {path: 'details/:id', component: DetailsPaymentComponent},
  {path: 'paiementJours', component: PaiementJoursComponent},
  {path: 'paiementEnAttente', component: PaiementEnAttenteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
