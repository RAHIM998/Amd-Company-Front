import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './pages/payment/payment.component';
import { DetailsPaymentComponent } from './pages/details-payment/details-payment.component';
import { PaiementJoursComponent } from './pages/paiement-jours/paiement-jours.component';
import { PaiementEnAttenteComponent } from './pages/paiement-en-attente/paiement-en-attente.component';


@NgModule({
  declarations: [
    PaymentComponent,
    DetailsPaymentComponent,
    PaiementJoursComponent,
    PaiementEnAttenteComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ],exports: [
    PaymentComponent,
    DetailsPaymentComponent,
    PaiementJoursComponent,
    PaiementEnAttenteComponent
  ]
})
export class PaymentModule { }
