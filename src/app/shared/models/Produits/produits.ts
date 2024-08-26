// produit.ts
export class Produits {
    constructor(
        public id: number,
        public libelle: string,
        public prix: string,
        public stock: number,
        public description?: string,
        public images?: Image[],
    ) {}
  }
  
  export interface Image {
    image: string; // Contient les données de l'image en base64
  }