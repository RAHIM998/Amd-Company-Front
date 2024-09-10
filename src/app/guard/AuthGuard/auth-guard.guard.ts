import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/AuthService/token.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.getToken()) {
    return true;
  }else{
    router.navigate(['']);
    return false;
  }

};
