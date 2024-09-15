import { CommandeDetails } from "../Commandes/commande-details";

export class Paiements {
    constructor(
        public id: number,
        public commande_id: string,
        public montant : number,
        public datePaiement : Date,
        public method : string,
        public status : string,
        public commande: CommandeDetails
    ){}
}
