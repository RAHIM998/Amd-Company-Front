import { Component, OnInit } from '@angular/core';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';

@Component({
  selector: 'app-commande-en-cours',
  templateUrl: './commande-en-cours.component.html',
  styleUrls: ['./commande-en-cours.component.css']
})
export class CommandeEnCoursComponent implements OnInit{
  
  TabCommandeEnCours: CommandeDetails[] = [];
  constructor(private commandeService: CommandeServiceService){}
  
  ngOnInit(): void {
    this.loadCommandeEnCours();
  }

  loadCommandeEnCours(){
    this.commandeService.getCommandeEnCours().subscribe(
      (response) => {
        this.TabCommandeEnCours = response.data;
        console.log(response.data)
      },(error) => {
        console.log(error);
      });
  }

}
