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
  //Service de récupération de l'utilisateur connecté 
  getUser(id: number): Observable<ApiResponse<Users>> {
    return this.http.get<ApiResponse<Users>>(`${this.url}/${id}`);
  }

  //Service de modification de l'utilisateur
  updateUser(id: number, user: FormData): Observable<ApiResponse<Users>> {
    return this.http.put<ApiResponse<Users>>(`${this.url}/${id}`, user);
  }
    

}
