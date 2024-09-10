import { Category } from "../Category/category";

// produit.ts
export class Produits {
    constructor(
        public id: number,
        public category_id: number,
        public libelle: string,
        public prix: string,
        public stock: number,
        public description?: string,
        public images?: Image[],
        public quantity?: number,
        public category?: Category,
      ) {}
  }
  
  export interface Image {
    image: string;
  }