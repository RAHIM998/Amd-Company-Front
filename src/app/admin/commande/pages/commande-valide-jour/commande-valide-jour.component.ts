import { Component, OnInit } from '@angular/core';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';

@Component({
  selector: 'app-commande-valide-jour',
  templateUrl: './commande-valide-jour.component.html',
  styleUrls: ['./commande-valide-jour.component.css']
})
export class CommandeValideJourComponent implements OnInit{

  TabCommandeValideJour: any[] = [];
  nbCommandeValide: number = 0;
  montantTotal: string = '';

  constructor(private commandeService: CommandeServiceService){}
  
  ngOnInit(): void {
    this.loadCommandeValide();
  }


  loadCommandeValide(): void {
    this.commandeService.getCommandeValide().subscribe(
      response => {
        if (response.success) {
          this.TabCommandeValideJour = response.data.commandes;
          this.nbCommandeValide = response.data.nbCommande;
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
