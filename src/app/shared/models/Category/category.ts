import { Produits } from "../Produits/produits";

export interface Category {
    id: number;
    libelle: string;
    produit ?: Produits[];
}
