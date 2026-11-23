import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Para login y registro: si ya hay sesión, no tiene sentido volver ahí. */
export const noAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.estaLogueado() ? router.createUrlTree(['/usuarios']) : true;
};
