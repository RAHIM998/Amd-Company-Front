import { Component, OnInit } from '@angular/core';
import { Produits } from 'src/app/shared/models/Produits/produits';
import { PanierService } from 'src/app/shared/services/Panier/panier.service';

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

  constructor(private panierService: PanierService) { }

  /**
   * Initialise le composant en récupérant les articles du panier et en calculant les totaux.
   */
  ngOnInit(): void {
    this.items = this.panierService.getItems();
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

  /**
   * Augmente la quantité d'un produit dans le panier et met à jour les totaux.
   * @param productId - ID du produit dont la quantité doit être augmentée.
   */
  incrementQuantity(productId: number) {
    const item = this.items.find(p => p.id === productId);
    if (item) {
      const currentQuantity = this.panierService.getQuantity(productId);
      this.panierService.setQuantity(productId, currentQuantity + 1);
      this.calculateTotals();
    }
  }

  /**
   * Diminue la quantité d'un produit dans le panier si elle est supérieure à 1 et met à jour les totaux.
   * @param productId - ID du produit dont la quantité doit être diminuée.
   */
  decrementQuantity(productId: number) {
    const item = this.items.find(p => p.id === productId);
    if (item) {
      const currentQuantity = this.panierService.getQuantity(productId);
      if (currentQuantity > 1) {
        this.panierService.setQuantity(productId, currentQuantity - 1);
        this.calculateTotals();
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
    // Logique pour passer la commande
  }
}
