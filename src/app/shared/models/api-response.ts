import { CommandeDetails } from "./Commandes/commande-details";

export interface ApiResponse <T> {
    errors: {};
    success: boolean;
    message: string;
    data: T;
    statut: number
}

export interface CommandeResponse {
    nbCommande: number;
    MontantTotal: number;
    commandes: CommandeDetails[];
  }