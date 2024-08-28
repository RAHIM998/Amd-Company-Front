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
    numeroCommande: string;
    dateCommande: Date;
    montant: number;
    adresseLivraison: string;
    status: string;
    produits: Produit[];
    showProducts?: boolean; // pour gérer l'affichage des produits
  }
  
  export interface ProduitImage {
    id: number;
    image: string;
    base64: string; 
  }
  