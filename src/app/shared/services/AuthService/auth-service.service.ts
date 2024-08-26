import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../models/Authentification/login';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Users } from '../../models/Users/users';
import { AuthResponse } from '../../models/Authentification/auth-response';

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


}
