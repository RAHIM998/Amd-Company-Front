import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/api-response';
import { Paiements } from '../../models/Paiements/paiements';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementServiceService {

  constructor(private http: HttpClient) { }

  url = 'http://127.0.0.1:8000/api/admin/paiement';

  // Service de récupération de la liste des paiements
  getAllPayments(): Observable<ApiResponse<Paiements[]>> {
    return this.http.get<ApiResponse<Paiements[]>> (this.url);
  }

  // Service de récupération du paiements via l'id
  getPaiementById(id: number): Observable<ApiResponse<Paiements>> {
    return this.http.get<ApiResponse<Paiements>> (`${this.url}/${id}`);
  }

  // Service de récupération du paiements du jours
  getPaiementDays(): Observable<ApiResponse<{ CAJournalier: number, PaiementDuJour: Paiements[] }>> {
    return this.http.get<ApiResponse<{ CAJournalier: number, PaiementDuJour: Paiements[] }>>(`${this.url}/jours`);
  }

  // Service de récupération des paiements en attente
  getPaiementPending(): Observable<ApiResponse<{ MontantPaiementEnAttente: number, PaiementDuJour: Paiements[] }>> {
    return this.http.get<ApiResponse<{ MontantPaiementEnAttente: number, PaiementDuJour: Paiements[] }>>(`${this.url}/enAttente`);
  }

}
