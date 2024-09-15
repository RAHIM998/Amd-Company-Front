import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paiements } from 'src/app/shared/models/Paiements/paiements';
import { PaiementServiceService } from 'src/app/shared/services/PaiementService/paiement-service.service';

@Component({
  selector: 'app-details-payment',
  templateUrl: './details-payment.component.html',
  styleUrls: ['./details-payment.component.css']
})
export class DetailsPaymentComponent implements OnInit{
  
  id: number | null = null;
  paiement: Paiements | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paiementService: PaiementServiceService
  ) { }
  
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.paiementService.getPaiementById(this.id).subscribe(
        (response) => {
          // Assurez-vous que la réponse contient un seul objet Payments
          if (response.success && response.data) {
            this.paiement = response.data;
          } else {
            this.error = response.message || 'Détails du paiement non trouvés.';
          }
        },
        (error) => {
          this.error = 'Erreur lors de la récupération des détails du paiement.';
          console.error('Erreur:', error);
        }
      );
    } else {
      this.error = 'Identifiant de paiement invalide.';
    }
  
  }

}
