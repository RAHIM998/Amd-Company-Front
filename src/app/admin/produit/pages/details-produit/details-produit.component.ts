import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/shared/models/Commandes/commande-details';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit{

  id: number | null = null;
  Produit!: Produits; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitServiceService
  ){}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.produitService.getProduitById(this.id).subscribe(
        (response) => {
          if (response.success) {          
            this.Produit = response.data;
          } else {
            console.error('Erreur :', response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    }
  }

  //Méthode de suppression des burgers 
  DeleteProduit(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007BFF',  
      cancelButtonColor: '#d33',  
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
      background: '#f0f0f0', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.DeleteProduit(id).subscribe(
          (response) => { 
            Swal.fire({
              title: 'Supprimé!',
              text: "Le burger a été supprimé avec succès.",
              icon: 'success',
              confirmButtonColor: '#007BFF' 
            });
            this.router.navigate(['/admin/produit']);
          },
          (error) => {
            Swal.fire({
              title: 'Erreur!',
              text: "Une erreur est survenue.",
              icon: 'error',
              confirmButtonColor: '#007BFF'  
            });
            console.log(error);
          }
        )
      }
    });
  }



}
