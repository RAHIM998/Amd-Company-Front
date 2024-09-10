import { Component, OnInit } from '@angular/core';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit{

  TabCommande : CommandeDetails [] = [];

  constructor(private commandeService: CommandeServiceService){}

  ngOnInit(): void {
    this.loadCommande();
  }

  loadCommande(): void{
    this.commandeService.getCommande().subscribe(
      (response) => {
        this.TabCommande = response.data;
      },(error) => {
        console.log(error);
      });
    }

}
