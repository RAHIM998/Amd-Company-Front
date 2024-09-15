import { Component, OnInit } from '@angular/core';
import { Paiements } from 'src/app/shared/models/Paiements/paiements';
import { PaiementServiceService } from 'src/app/shared/services/PaiementService/paiement-service.service';

@Component({
  selector: 'app-paiement-en-attente',
  templateUrl: './paiement-en-attente.component.html',
  styleUrls: ['./paiement-en-attente.component.css']
})
export class PaiementEnAttenteComponent implements OnInit {

  tabPaiements: Paiements[] = [];
  montantTotal: number = 0;

  constructor(
    private paiementService: PaiementServiceService
  ) { }

  ngOnInit(): void {
    this.getTabPaiement();
  }

  getTabPaiement() {
    this.paiementService.getPaiementPending().subscribe({
      next: (response) => {
        if (response.success) {
          console.log(response.data.MontantPaiementEnAttente);
          this.montantTotal = response.data.MontantPaiementEnAttente;
          this.tabPaiements = response.data.PaiementDuJour;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des paiements :', err);
      }
    });
  }




}
