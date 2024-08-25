import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../models/CategoryResponse/category-response';
import { Category } from '../../models/Category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private url = 'http://127.0.0.1:8000/api/category';

  constructor(private http: HttpClient) { }

  //Service de recupération des catégory 
  getCategories(): Observable<CategoryResponse<Category[]>> {
    return this.http.get<CategoryResponse<Category[]>>(this.url);
  }

  //service de recupération des catégory par leur id 
  getCategoryById(categoryId: number): Observable<CategoryResponse<Category>> {
    return this.http.get<CategoryResponse<Category>>(`${this.url}/${categoryId}`);
  }
  
}
