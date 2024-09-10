import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.css']
})
export class MesCommandesComponent implements OnInit {
  orders: CommandeDetails[] = [];

  constructor(
    private router: Router,
    private commandeService: CommandeServiceService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.commandeService.getCommande().subscribe(
      response => {
        this.orders = response.data;
        console.log('Commandes récupérées:', this.orders);
      },
      error => {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    );
  }

  getStatusClass(status: string): string {
    return status === 'delivered' ? 'commande-livree' :
           status === 'pending' ? 'commande-en-cours' :
           status === 'rejected' ? 'commande-annulee' :
           status === 'accepted' ? 'commande-acceptée' :
           'unknown'; 
  }

  toggleProducts(order: CommandeDetails): void {
    order.showProducts = !order.showProducts;
  }

  isReturnable(order: CommandeDetails): boolean {
    if (order.status !== 'delivered') return false;
    const deliveredDate = new Date(order.dateCommande); 
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - deliveredDate.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 3;
  }

  isCancelable(order: CommandeDetails): boolean {
    return order.status === 'pending';
  }

  getProgressClass(status: string): string {
    return status === 'pending' ? 'pending' :
           status === 'accepted' ? 'accepted' :
           status === 'delivered' ? 'delivered' :
           '';
  }

  cancelOrder(order: CommandeDetails): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annuler!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.destroyCommande(order.id).subscribe(
          response => {
            this.getAllOrders();
            Swal.fire(
              'Annulée!',
              'La commande a été annulée !',
              'success'
            );
          },
          error => {
            console.error('Erreur lors de l\'annulation de la commande:', error);
            Swal.fire(
              'Erreur!',
              'Erreur lors de l\'annulation de la commande.',
              'error'
            );
          }
        );
      }
    });
  }
}
