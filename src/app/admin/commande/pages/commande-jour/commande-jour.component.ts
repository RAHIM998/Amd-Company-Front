import { Component, OnInit } from '@angular/core';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';

@Component({
  selector: 'app-commande-jour',
  templateUrl: './commande-jour.component.html',
  styleUrls: ['./commande-jour.component.css']
})
export class CommandeJourComponent implements OnInit{
  
  TabCommandeJour: CommandeDetails[] = [];

  constructor(private commandeService: CommandeServiceService){}
  ngOnInit(): void {
    this.loadCommandeJour();
  }

  loadCommandeJour(){
    this.commandeService.getCommandeJours().subscribe(
      (response) => {
        this.TabCommandeJour = response.data;
      },(error) => {
        console.log(error);
      });
  }

}
