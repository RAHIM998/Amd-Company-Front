import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CommandeResponse } from '../../models/api-response';
import { Commandes } from '../../models/Commandes/commandes';
import { CommandeDetails } from '../../models/Commandes/commande-details';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

  constructor(private http: HttpClient) { }

  url = "http://127.0.0.1:8000/api/commande"

  //Service de recupération des commandes 
  getCommande():Observable<ApiResponse<CommandeDetails[]>>{
    return this.http.get<ApiResponse<CommandeDetails[]>>(this.url);
  }

  //Service de recupération des commandes du jours
  getCommandeJours():Observable<ApiResponse<CommandeDetails[]>>{
    return this.http.get<ApiResponse<CommandeDetails[]>>('http://127.0.0.1:8000/api/admin/commande/jours');
  }

  //Service de recupération des commandes en cours
  getCommandeEnCours():Observable<ApiResponse<CommandeDetails[]>>{
    return this.http.get<ApiResponse<CommandeDetails[]>>('http://127.0.0.1:8000/api/admin/commande/encours');
  }

  //Service de recupération des commandes validées de la journée 
  getCommandeValide(): Observable<ApiResponse<CommandeResponse>> {
    return this.http.get<ApiResponse<CommandeResponse>>('http://127.0.0.1:8000/api/admin/commande/valide');
  }

  //Service de recupération des commandes annnulée de la journée 
  getCommandeAnnulee():Observable<ApiResponse<CommandeResponse>>{
    return this.http.get<ApiResponse<CommandeResponse>>('http://127.0.0.1:8000/api/admin/commande/annulee');
  }

  //Service de passation de commande
  createOrder(orderData: Commandes): Observable<ApiResponse<Commandes>> {
    return this.http.post<ApiResponse<Commandes>>(this.url, orderData);
  }

  // Méthode pour annuler une commande
  destroyCommande(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  // Service de recupération d'une commande
  getCommandeById(id: number): Observable<ApiResponse<CommandeDetails>> {
    return this.http.get<ApiResponse<CommandeDetails>> (`${this.url}/${id}`);
  }

  // Service de modification du statut
  UpdateStatut(id: number, statut: string): Observable<ApiResponse<CommandeDetails>> {
  return this.http.put<ApiResponse<CommandeDetails>>(
    `http://127.0.0.1:8000/api/admin/commande/${id}`, 
    { status: statut } 
  );
}


}
