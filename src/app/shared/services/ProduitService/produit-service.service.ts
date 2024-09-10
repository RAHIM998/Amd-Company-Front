import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../models/CategoryResponse/category-response';
import { Produits } from '../../models/Produits/produits';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

  constructor(private http: HttpClient) { }


  $api = 'http://127.0.0.1:8000/api/produit/'
  $url = 'http://127.0.0.1:8000/api/search'

  //Service de recupération de tous les produits dans la bd 
  getAllProduits(): Observable<ApiResponse<Produits[]>> {
    return this.http.get<ApiResponse<Produits[]>>(this.$api);
  }


  //Service de recupération des produits par catalogue
  getProduitPerCategory(categoryId : number): Observable<CategoryResponse<Produits[]>>{
    return this.http.get<CategoryResponse<Produits[]>>(`${this.$api}${categoryId}/products`)
  }

  //Service de récupération des détails de produit 
  getProduitById(id: number): Observable<ApiResponse<Produits>> {
    return this.http.get<ApiResponse<Produits>>(`${this.$api}${id}`);
  }

  //service d'envoie et de recupération des nom de produits à rechercher 
  searchProduits(searchQuery: string): Observable<ApiResponse<Produits[]>> {
    const params = new HttpParams().set('search', searchQuery);
    return this.http.get<ApiResponse<Produits[]>>(`${this.$url}`, { params });
  }

  //Service de suppression des produits
  DeleteProduit(id: number): Observable<ApiResponse<Produits>> {
    return this.http.delete<ApiResponse<Produits>>(`http://127.0.0.1:8000/api/admin/produit/${id}`);
  }

  //Service de sauvegarde des produits 
   addProduit(produit: FormData): Observable<ApiResponse<Produits>> {
    return this.http.post<ApiResponse<Produits>>('http://127.0.0.1:8000/api/admin/produit/', produit);
  }

   //Service de mis à jour d'un produit
  updateProduit(id: number, formData: FormData): Observable<ApiResponse<Produits>> {
    return this.http.put<ApiResponse<Produits>>(`http://127.0.0.1:8000/api/admin/produit/${id}`, formData);
  }
  

}
