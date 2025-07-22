import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./Components/Auth/login/login.component').then( m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./Components/Auth/signup/signup.component').then( m => m.SignupComponent)
  },
];
