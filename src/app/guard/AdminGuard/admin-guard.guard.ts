import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/AuthService/token.service';
import jwt_decode from 'jwt-decode';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isConnect()) {
    const token = tokenService.getToken();
    try {
      // Décodage du token
      const decodedToken: any = jwt_decode(token);

      let role = localStorage.getItem('role');

      if (role === "admin") {
        return true;
      } else {
        router.navigate(['/access-denied']); 
        return false;
      }
    } catch (e) {
      console.error('Erreur de décodage du token:', e);
      router.navigate(['/access-denied']);
      return false;
    }
  } else {
    router.navigate(['/login']); 
    return false;
  }
};
