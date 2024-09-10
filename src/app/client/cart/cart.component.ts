  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  import { Produits } from 'src/app/shared/models/Produits/produits';
  import { PanierService } from 'src/app/shared/services/Panier/panier.service';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
  })
  export class CartComponent implements OnInit {
    items: Produits[] = []; // Liste des produits dans le panier
    subTotal: number = 0; // Sous-total du panier avant les frais de livraison
    total: number = 0; // Total du panier avec les frais de livraison
    shippingCost: number = 2000; // Coût de la livraison
    error: string | null = null; // Message d'erreur éventuel
    quantite: number = 0

    constructor(
      private panierService: PanierService,
      private router: Router
    ) { }

    /**
     * Initialise le composant en récupérant les articles du panier et en calculant les totaux.
     */
    ngOnInit(): void {
      this.items = this.panierService.getItems();
      this.items.forEach(item => {
        item.quantity = this.panierService.getQuantity(item.id); // Assurez-vous que chaque produit a une quantité définie
      });
      this.calculateTotals();
    }

    /**
     * Supprime un produit du panier et met à jour la liste des articles et les totaux.
     * @param productId - ID du produit à supprimer.
     */
    removeItem(productId: number) {
      this.panierService.removeItem(productId);
      this.items = this.panierService.getItems(); // Mise à jour de la liste après suppression
      this.calculateTotals();
    }

    /**
     * Vide le panier et met à jour les totaux.
     */
    clearCart() {
      this.items = this.panierService.clearPanier();
      this.calculateTotals();
    }

    incrementQuantity(productId: number) {
      const item = this.items.find(p => p.id === productId);
      if (item) {
        const currentQuantity = this.panierService.getQuantity(productId);
        if (currentQuantity < item.stock) { // Vérifier le stock avant d'augmenter
          this.panierService.setQuantity(productId, currentQuantity + 1);
          this.calculateTotals();
          window.location.reload(); // Recharger la page
        } else {
          Swal.fire({
            title: 'Quantité maximale atteinte',
            text: 'Vous avez atteint la quantité maximale disponible pour ce produit.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      }
    }
    
    decrementQuantity(productId: number) {
      const item = this.items.find(p => p.id === productId);
      if (item) {
        const currentQuantity = this.panierService.getQuantity(productId);
        if (currentQuantity > 1) { // Assurez-vous que la quantité ne passe pas en dessous de 1
          this.panierService.setQuantity(productId, currentQuantity - 1);
          this.calculateTotals();
          window.location.reload(); // Recharger la page
        }
      }
    }
    

    /**
     * Obtient la quantité d'un produit spécifique dans le panier.
     * @param productId - ID du produit dont on souhaite obtenir la quantité.
     * @returns La quantité du produit ou 1 si elle n'est pas définie.
     */
    getQuantity(productId: number): number {
      return this.panierService.getQuantity(productId);
    }

    /**
     * Calcule le sous-total et le total du panier, y compris les frais de livraison.
     */
    calculateTotals() {
      this.subTotal = this.items.reduce((acc, item) => acc + this.getFormattedPrice(item.prix) * this.getQuantity(item.id), 0);
      this.total = this.subTotal + this.shippingCost;
    }

    /**
     * Formate le prix d'un produit en nombre à virgule flottante.
     * @param price - Prix du produit sous forme de chaîne.
     * @returns Le prix formaté en nombre.
     */
    getFormattedPrice(price: string): number {
      return parseFloat(price.replace(',', '.'));
    }

    /**
     * Place une commande (logique de commande à implémenter).
     */
    placeOrder() {
      if (localStorage.getItem('token')) {
        this.calculateTotals();
        this.router.navigate(['/recapCommande'], { state: { items: this.items, total: this.total } });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Veuillez vous connecter ou créer un compte pour passer une commande.',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
          position: 'top-end'
        });
    
        this.router.navigate(['/login'], {
          queryParams: { redirectTo: '/recapCommande' }
        });
      }
    }
    
    
  }

