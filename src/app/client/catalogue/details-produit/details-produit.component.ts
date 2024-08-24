import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
  produit: Produits | null = null;
  id: number = 0;
  error: string | null = null;
  mainImage: string | null = null; // Pour stocker l'image principale à afficher

  constructor(
    private produitService: ProduitServiceService,
    private panierService: PanierService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.loadDetailsProduit();
    } else {
      this.error = 'Id invalide.';
    }
  }

  //Méthode de chargement des données dans le détails commande 
  loadDetailsProduit(): void {
    this.produitService.getProduitById(this.id).subscribe(
      (response) => {
        this.produit = response.data;
        if (this.produit && this.produit.images && this.produit.images.length > 0) {
          this.mainImage = this.produit.images[0].image; // Initialiser l'image principale
        }
      },
      (error) => {
        console.error(error);
        this.error = 'Une erreur est survenue lors du chargement des détails du produit.';
      }
    );
  }

  //Méthode d'affichage des images 
  updateMainImage(img: string): void {
    this.mainImage = img;
  }

  //Méthode d'ajout au panier 
  addToCart(product: Produits): void {
    this.panierService.AddToPanier(product);
    alert(`${product.libelle} a été ajouté au panier !`);
  }

  
}
