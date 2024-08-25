import { Injectable } from '@angular/core';
import { Produits } from '../../models/Produits/produits';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private items: Produits[] = []; // Liste des produits dans le panier
  private quantities: { [id: number]: number } = {}; // Quantités de chaque produit
  private cartItemCount = new BehaviorSubject<number>(0); // Nombre total d'articles dans le panier

  cartItemCount$ = this.cartItemCount.asObservable(); // Observable pour les mises à jour du nombre d'articles

  constructor() { 
    this.loadCart(); // Charger le panier depuis le localStorage au démarrage
  }

  AddToPanier(product: Produits) {
    const existingProduct = this.items.find(item => item.id === product.id);

    if (existingProduct) {
      const currentQuantity = this.quantities[product.id];
      if (currentQuantity < product.stock) { // Vérifier le stock avant d'ajouter
        this.quantities[product.id] = currentQuantity + 1; // Augmenter la quantité
        Swal.fire({
          title: 'Produit ajouté',
          text: 'La quantité du produit a été augmentée.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Stock insuffisant',
          text: 'Vous ne pouvez pas ajouter plus de ce produit, le stock est épuisé.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    } else {
      this.items.push(product);
      this.quantities[product.id] = 1; // Initialiser la quantité
      Swal.fire({
        title: 'Produit ajouté',
        text: 'Le produit a été ajouté au panier.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    this.saveCart(); // Sauvegarder les modifications dans localStorage
  }

  /**
   * Récupère la liste des produits dans le panier.
   * @returns Un tableau de produits.
   */
  getItems() {
    return this.items;
  }

  /**
   * Récupère les quantités des produits dans le panier.
   * @returns Un dictionnaire des quantités pour chaque produit.
   */
  getQuantities() {
    return this.quantities;
  }

  /**
   * Vide le panier.
   * Réinitialise les quantités et sauvegarde les modifications dans localStorage.
   * @returns Un tableau vide.
   */
  clearPanier() {
    this.items = [];
    this.quantities = {}; // Réinitialiser les quantités
    this.saveCart(); // Sauvegarder les modifications dans localStorage
    this.cartItemCount.next(this.items.length);
    return this.items;
  }

  /**
   * Supprime un produit du panier.
   * Réinitialise les quantités associées et sauvegarde les modifications dans localStorage.
   * @param productId - ID du produit à supprimer.
   */
  removeItem(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    delete this.quantities[productId]; // Supprimer la quantité
    this.saveCart(); // Sauvegarder les modifications dans localStorage
    this.cartItemCount.next(this.items.length);
  }

  /**
   * Récupère la quantité d'un produit spécifique dans le panier.
   * @param productId - ID du produit dont on souhaite obtenir la quantité.
   * @returns La quantité du produit ou 0 s'il n'est pas présent.
   */
  getQuantity(productId: number): number {
    return this.quantities[productId] || 0;
  }

  /**
   * Définit la quantité d'un produit spécifique dans le panier.
   * Met à jour la quantité ou supprime le produit si la quantité est zéro ou négative.
   * @param productId - ID du produit dont on souhaite définir la quantité.
   * @param quantity - Nouvelle quantité du produit.
   */
  setQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.quantities[productId] = quantity;
    } else {
      delete this.quantities[productId];
    }
    this.saveCart(); // Sauvegarder les modifications dans localStorage
  }

  /**
   * Sauvegarde les articles du panier et les quantités dans le localStorage.
   */
  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
    localStorage.setItem('cartQuantities', JSON.stringify(this.quantities));
    this.cartItemCount.next(this.items.length);
  }

  /**
   * Charge les articles du panier et les quantités depuis le localStorage.
   */
  private loadCart() {
    const savedItems = localStorage.getItem('cartItems');
    const savedQuantities = localStorage.getItem('cartQuantities');
    
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
    
    if (savedQuantities) {
      this.quantities = JSON.parse(savedQuantities);
    }

    this.cartItemCount.next(this.items.length);
  }
}
