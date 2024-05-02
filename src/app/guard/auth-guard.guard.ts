import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isTokenValid()) {
    return true;
  }
  else {
    console.log(authService.getToken());
    router.navigate(['/login']);
    return false;
  }


};