import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CommandeResponse } from '../../models/api-response';
import { CommandeDetails } from '../../models/Commandes/commande-details';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http : HttpClient) { }

   //Service de recupération des commandes validées de la journée 
   getCommandeValide(): Observable<ApiResponse<{ nbCommandeValide: number, MontantTotal: number,  commandes: CommandeDetails[] }>> {
    return this.http.get<ApiResponse<{ nbCommandeValide: number, MontantTotal: number,  commandes: CommandeDetails[] }>>('http://127.0.0.1:8000/api/admin/commande/valide');
  }

  //Service de recupération des commandes en cours
  getCommandeEnCours():Observable<ApiResponse<{ total: number, orders: CommandeDetails[] }>>{
    return this.http.get<ApiResponse<{ total: number, orders: CommandeDetails[] }>>('http://127.0.0.1:8000/api/admin/commande/encoursjours');
  }

  //Service de recupération des commandes annnulée de la journée 
  getCommandeAnnulee():Observable<ApiResponse<{ NbCommandeAnnulee: number, MontantTotal: number, Commande: CommandeDetails[] }>>{
   return this.http.get<ApiResponse<{ NbCommandeAnnulee: number, MontantTotal: number, Commande: CommandeDetails[] }>>('http://127.0.0.1:8000/api/admin/commande/annulee');
  }
 
  //Service de recupération des ventes mensuelles
  VentesMensuelles(): Observable<{success: boolean, message: string, data: CommandeDetails[]}> {
    return this.http.get<{success: boolean, message: string, data: CommandeDetails[]}>('http://127.0.0.1:8000/api/admin/commande/venteMois');
  }
}
