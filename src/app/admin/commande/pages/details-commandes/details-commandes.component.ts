import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CommandeDetails } from 'src/app/shared/models/Commandes/commande-details';
import { CommandeServiceService } from 'src/app/shared/services/CommandeService/commande-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-commandes',
  templateUrl: './details-commandes.component.html',
  styleUrls: ['./details-commandes.component.css']
})
export class DetailsCommandesComponent implements OnInit{

  commande: CommandeDetails | null = null;
  id:number = 0
  error: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeServiceService,
    private router: Router 
  ){}
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.loadCommande();
    } else {
      this.error = 'ID de commande invalide.';
    }
  }

  loadCommande() {
    if (this.id) {
      this.commandeService.getCommandeById(this.id).subscribe(
        (response) => {
          if (response.success && response.data) {
            this.commande = response.data;
          } else {
            this.error = response.message || 'Détails de la commande non trouvés.';
          }
        },
        (error) => {
          this.error = 'Erreur lors de la récupération des détails de la commande.';
          console.error('Erreur:', error);
        }
      );
    }
  }

changeStatus(id: number, statut: string) {
  // Afficher une boîte de dialogue de confirmation avant de changer le statut
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: `Voulez-vous vraiment ${statut === 'accepted' ? 'accepter' : statut === 'rejected' ? 'annuler' : 'livrer'} cette commande?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#007BFF',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme, procéder à la mise à jour du statut
      this.commandeService.UpdateStatut(id, statut).pipe(
        catchError(error => {
          let userFriendlyMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          
          // Gestion des différents codes d'erreur
          if (error.status === 403) {
            userFriendlyMessage = "Vous ne pouvez pas modifier une commande déjà payée !";
          } else if (error.status === 422) {
            const backendErrorMessage = error.error?.message || "Transition de statut non autorisée.";
            userFriendlyMessage = `Erreur : ${backendErrorMessage}`;
          } else if (error.status === 500) {
            userFriendlyMessage = "Erreur de serveur. Veuillez réessayer plus tard.";
          }

          console.error('Erreur lors de la mise à jour du statut:', error);
          
          // Afficher l'erreur via SweetAlert
          Swal.fire({
            title: 'Erreur!',
            text: userFriendlyMessage,
            icon: 'error',
            confirmButtonColor: '#007BFF'
          });

          // Retourne un Observable d'erreur pour arrêter l'exécution
          return throwError(userFriendlyMessage);
        })
      ).subscribe(response => {
        // Gestion en cas de succès
        if (statut === 'accepted') {
          Swal.fire({
            title: 'Acceptée!',
            text: "La commande a été acceptée avec succès.",
            icon: 'success',
            confirmButtonColor: '#007BFF'
          }).then(() => {
            window.location.reload();
          });
        } else if (statut === 'rejected') {
          Swal.fire({
            title: 'Annulée!',
            text: "La commande a été annulée avec succès.",
            icon: 'success',
            confirmButtonColor: '#007BFF'
          }).then(() => {
            this.router.navigate(['/admin/commande']);
          });
        } else if (statut === 'delivered') {
          Swal.fire({
            title: 'Livrée!',
            text: "La commande a été livrée avec succès.",
            icon: 'success',
            confirmButtonColor: '#007BFF'
          }).then(() => {
            window.location.reload();
          });
        }

        console.log('Statut mis à jour avec succès', response);
      });
    }
  });
}


}
