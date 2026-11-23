import { Routes } from '@angular/router';
import { Usuarios } from './views/usuarios/usuarios';
import { Rutas } from './views/rutas/rutas';
import { Accesorios } from './views/accesorios/accesorios';
import { Login } from './views/login/login';
import { Registro } from './views/registro/registro';
import { MenuComponent } from './menu/menu/menu.component';
import { authGuard } from './services/auth.guard';
import { noAuthGuard } from './services/no-auth.guard';

export const routes: Routes = [
  // La app siempre arranca en el login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Páginas públicas (sin menú). Si ya hay sesión, redirigen a /usuarios
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  { path: 'registro', component: Registro, canActivate: [noAuthGuard] },

  // Páginas privadas: van dentro del menú y exigen sesión
  {
    path: '',
    component: MenuComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'usuarios', component: Usuarios },
      { path: 'rutas', component: Rutas },
      { path: 'accesorios', component: Accesorios },
    ],
  },

  // Cualquier ruta desconocida vuelve al login
  { path: '**', redirectTo: 'login' },
];
