import { HttpClient } from '@angular/common/http';
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
}
