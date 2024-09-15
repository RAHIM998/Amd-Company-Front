import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/api-response';
import { Users } from '../../models/Users/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  private url = 'http://127.0.0.1:8000/api/user';
  private urlAdmin = 'http://127.0.0.1:8000/api/admin/user';

  //Service de récupération de l'utilisateur connecté 
  getUser(id: number): Observable<ApiResponse<Users>> {
    return this.http.get<ApiResponse<Users>>(`${this.url}/${id}`);
  }

  //Service de modification de l'utilisateur
  updateUser(id: number, user: FormData): Observable<ApiResponse<Users>> {
    return this.http.put<ApiResponse<Users>>(`${this.url}/${id}`, user);
  }

  //Service de recupération des utilisateurs
  getUsers(): Observable<ApiResponse<Users[]>> {
    return this.http.get<ApiResponse<Users[]>>(this.url);
  }

  //Service de suppression des utilisateurs
  deleteUser(id: number): Observable<ApiResponse<Users>> {
    return this.http.delete<ApiResponse<Users>>(`${this.urlAdmin}/${id}`);
  }

  //Service de création des administrateurs
  createAdmin(user: FormData): Observable<ApiResponse<Users>> {
    return this.http.post<ApiResponse<Users>>(this.urlAdmin, user);
  }

  //Service de recupération d'un utilisateur 
  getUserById(id: number): Observable<ApiResponse<Users>> {
    return this.http.get<ApiResponse<Users>>(`${this.url}/${id}`);
  }

}
