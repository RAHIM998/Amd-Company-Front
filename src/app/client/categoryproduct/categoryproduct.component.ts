import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { CategoryServiceService } from 'src/app/shared/services/CategoryService/category-service.service';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';
import { ProduitServiceService } from 'src/app/shared/services/ProduitService/produit-service.service';

@Component({
  selector: 'app-categoryproduct',
  templateUrl: './categoryproduct.component.html',
  styleUrls: ['./categoryproduct.component.css']
})
export class CategoryproductComponent implements OnInit {
  
  products: Produits[] = [];
  categoryName: string = '';
  categoryId: number = 0;
  
  constructor(
    private produitService: ProduitServiceService,
    private categoryService: CategoryServiceService,
    private panierService: PanierService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('id')!;
      this.loadProducts();
      this.loadCategoryName(); 
    });
  }

  loadProducts(): void {
    this.produitService.getProduitPerCategory(this.categoryId).subscribe(response => {
      if (response.success) {
        this.products = response.data;
      } else {
        console.error('Erreur lors de la récupération des produits');
      }
    });
  }

  loadCategoryName(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe(response => {
      if (response.success) {
        this.categoryName = response.data.libelle;
      } else {
        console.error('Erreur lors de la récupération du nom de la catégorie');
      }
    });
  }

  //Méthode d'ajout de produit dans le panier 
  ajouterProduit(products: Produits): void {
    this.panierService.AddToPanier(products);
  }
}
