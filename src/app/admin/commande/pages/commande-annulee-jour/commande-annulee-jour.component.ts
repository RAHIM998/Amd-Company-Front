import { Component, OnInit } from '@angular/core';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';

@Component({
  selector: 'app-commande-annulee-jour',
  templateUrl: './commande-annulee-jour.component.html',
  styleUrls: ['./commande-annulee-jour.component.css']
})
export class CommandeAnnuleeJourComponent implements OnInit{
  
  

  TabCommandeAnnuleeJour: any[] = [];
  nbCommandeAnnulee: number = 0;
  montantTotal: string = '';

  constructor(private commandeService: CommandeServiceService){}
  
  ngOnInit(): void {
    this.loadCommandeAnnulee();
  }

  loadCommandeAnnulee(): void {
    this.commandeService.getCommandeAnnulee().subscribe(
      response => {
        console.log('Réponse reçue:', response);
        if (response.success) {
          this.TabCommandeAnnuleeJour = response.data.commandes;
          this.nbCommandeAnnulee = response.data.nbCommande;
          this.montantTotal = response.data.MontantTotal.toString(); 
        } else {
          console.error('Erreur lors de la récupération des commandes:', response.message);
        }
      },
      error => {
        console.error('Erreur de serveur:', error);
      }
    );
  }
  


}
