import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/shared/models/Commandes/commande-details';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{

  TabProduit: Produits[] = []; 
 

  constructor(private produitService: ProduitServiceService){}
  ngOnInit(): void {
    this.loadProduit();
  }

  // Récupération de la liste des produits
  loadProduit(): void {
    this.produitService.getAllProduits().subscribe(
      (response) => {
        this.TabProduit = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Méthode pour tronquer la description
  truncateDescription(description: string | undefined, wordLimit: number): string {
    if (!description) return '';
  
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
  
    return words.slice(0, wordLimit).join(' ') + '...';
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
            this.loadProduit();
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
