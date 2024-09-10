import { Users } from "../Users/users";

export interface Produit {
    id: number;
    libelle: string;
    prix: number;
    stock: number;
    pivot: {
        quantite: number;
    };
    images: ProduitImage[];
  }
  
  export interface CommandeDetails {
    id: number;
    user_id: number;
    numeroCommande: string;
    dateCommande: Date;
    montant: number;
    adresseLivraison: string;
    status: string;
    produits: Produit[];
    user: Users; 
    images?: ProduitImage[],
    showProducts?: boolean; 
  }
  
  export interface ProduitImage {
    id: number;
    image: string;
    base64: string; 
  }
  