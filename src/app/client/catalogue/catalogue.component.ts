import { Component, OnInit } from '@angular/core';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit{

  products: Produits[]= [];

  constructor(
    private produitService: ProduitServiceService,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.getProduits();
  }

  //chargement des produits dans le catalogue 
  getProduits(): void {
    this.produitService.getAllProduits().subscribe(
      (produits) => {
        console.log('Produits reçus:', produits);
        this.products = produits.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  //Méthode d'ajout de produit dans le panier 
  ajouterProduit(products: Produits): void {
    this.panierService.AddToPanier(products);
  }


}
