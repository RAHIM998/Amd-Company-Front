import { Component, OnInit } from '@angular/core';
import { Paiements } from 'src/app/shared/models/Paiements/paiements';
import { PaiementServiceService } from 'src/app/shared/services/PaiementService/paiement-service.service';

@Component({
  selector: 'app-paiement-jours',
  templateUrl: './paiement-jours.component.html',
  styleUrls: ['./paiement-jours.component.css']
})
export class PaiementJoursComponent implements OnInit{
  
  TabPayment: Paiements[] = [];
  caJournalier: number = 0;

  
  constructor(private paymentService: PaiementServiceService) { }
  
  ngOnInit(): void {
    this.getTabPaiement();
  }

  getTabPaiement() {
    this.paymentService.getPaiementDays().subscribe({
      next: (response) => {
        if (response.success) {
          this.caJournalier = response.data.CAJournalier;
          this.TabPayment = response.data.PaiementDuJour;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des paiements :', err);
      }
    });
  }
  
}
