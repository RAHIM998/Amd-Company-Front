export class Commandes {
    constructor(
        public user_id: number,
        produits: {
          id: number;
          quantite: number;
        }[],
        adresseLivraison: string,
    ) {}
}
