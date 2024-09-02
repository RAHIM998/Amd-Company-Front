import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  implements OnInit{

  searchQuery: string = '';
  searchResults: Produits[] = [];
  errorMessage: string = '';

  constructor(
    private produitService: ProduitServiceService,
     private route: ActivatedRoute,
     private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.onSearch();
      }
    });
  }


  onSearch(): void {
    this.produitService.searchProduits(this.searchQuery).subscribe(
      (response) => {
        if (response.success) {
          this.searchResults = response.data;
          this.errorMessage = '';
        } else {
          this.searchResults = [];
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.searchResults = [];
        this.errorMessage = 'Une erreur s\'est produite lors de la recherche.';
        console.log(error);
      }
    );
  }

   //Méthode d'ajout de produit dans le panier 
   ajouterProduit(products: Produits): void {
    this.panierService.AddToPanier(products);
  }


}
