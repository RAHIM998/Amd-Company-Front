import { Component, OnInit } from '@angular/core';
import { Paiements } from 'src/app/shared/models/Paiements/paiements';
import { PaiementServiceService } from 'src/app/shared/services/PaiementService/paiement-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  
  TabPayment: Paiements[] = [];
  showTotal: boolean = false;
  
  constructor(private paymentService: PaiementServiceService) { }

  ngOnInit(): void {
    this.getTabPaiement();
  }

  getTabPaiement() {
    this.paymentService.getAllPayments().subscribe(
      (response) => {
        this.TabPayment = response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements:', error);
      }
    );
  }

  /*loadTodayPayments(): void {
    this.paymentService.getPaymentsForToday().subscribe(
      (response) => {
        this.TabPayment = response.data;
        this.showTotal = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements du jour:', error);
      }
    );
  }
*/

  getTotalAmount(): number {
    return this.TabPayment.reduce((total: number, paie: Paiements) => total + (paie.montant), 0);
  }
}
