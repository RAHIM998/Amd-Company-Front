import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/shared/models/Authentification/auth-response';
import { Login } from 'src/app/shared/models/Authentification/login';
import { AuthServiceService } from 'src/app/shared/services/AuthService/auth-service.service';
import { TokenService } from 'src/app/shared/services/AuthService/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private tokenService: TokenService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    // 
  }

  login(): void {
    if (this.loginForm.valid) {
      const login: Login = this.loginForm.value as Login;
      this.authService.login(login).subscribe(
        response => {
          if (response.success) {
            const authResponse: AuthResponse = response.data!;
            const userRole = authResponse.user.role;
  
            this.tokenService.saveToken(authResponse.token);
            localStorage.setItem('id', authResponse.user.id.toString());
            localStorage.setItem('name', authResponse.user.name);
            localStorage.setItem('role', userRole);
  
            const redirectTo = this.router.routerState.snapshot.root.queryParams['redirectTo'];
              
            if (redirectTo) {
              this.router.navigate([redirectTo], { state: { items: history.state.items, total: history.state.total } })
              .then(() => {
                  window.location.reload();
              });
            } else if (userRole === 'admin') {
              this.router.navigate(['/admin/dashboard']).then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }
          } else {
            this.errorMessage = 'Identifiants incorrects';
          }
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'Identifiants incorrects';
          } else if (error.status === 500) {
            this.errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
          } else {
            this.errorMessage = 'Une erreur inattendue est survenue.';
          }
          console.error('Erreur de connexion', error);
        }
      );
    }
  }
  
}
