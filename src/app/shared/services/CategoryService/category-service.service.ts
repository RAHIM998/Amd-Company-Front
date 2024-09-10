import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../models/CategoryResponse/category-response';
import { Category } from '../../models/Category/category';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private url = 'http://127.0.0.1:8000/api/category';

  private url1 = 'http://127.0.0.1:8000/api/admin/category';

  constructor(private http: HttpClient) { }

  //Service de recupération des catégory 
  getCategories(): Observable<CategoryResponse<Category[]>> {
    return this.http.get<CategoryResponse<Category[]>>(this.url);
  }

  //service de recupération des catégory par leur id 
  getCategoryById(categoryId: number): Observable<CategoryResponse<Category>> {
    return this.http.get<CategoryResponse<Category>>(`${this.url}/${categoryId}`);
  }

  //Service de suppression des catégories
  DeleteCategory(id: number) {
    return this.http.delete(`${this.url1}/${id}`);
  }

  //Méthode de sauvegarde des catégories
  addCategory(categorie: { libelle: any }): Observable<CategoryResponse<Category>> {
    return this.http.post<CategoryResponse<Category>>(this.url1, categorie, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

   //Méthode de mis à jour des données 
   updateCategory(categorie: { libelle: any }, id: number): Observable<CategoryResponse<Category>> {
    return this.http.put<CategoryResponse<Category>>(`${this.url1}/${id}`, categorie, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    });
  }

}
