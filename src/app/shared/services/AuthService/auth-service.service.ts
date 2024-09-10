import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../models/Authentification/login';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { AuthResponse } from '../../models/Authentification/auth-response';
import { AuthRegister } from '../../models/auth-register';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  private url = "http://127.0.0.1:8000/api";

  login(Auth: Login): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.url}/login`, Auth);
  }

  Register(data: any): Observable<ApiResponse<AuthRegister>> {
    return this.http.post<ApiResponse<AuthRegister>>(`${this.url}/register`, data);
  }

  //Vérification du rôle des utilisateurs
  isAdmin(): boolean {
    const userRole = localStorage.getItem('role');
    return userRole === 'admin';
  }

}
