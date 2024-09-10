import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './guard/AuthGuard/auth-guard.guard';
import { adminGuardGuard } from './guard/AdminGuard/admin-guard.guard';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: 'admin', 
    loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuardGuard, adminGuardGuard]
  },
  { path: 'client', loadChildren:() => import('./client/client.module').then(m => m.ClientModule)},
  { path: 'securite', loadChildren:() => import('./securite/securite.module').then(m => m.SecuriteModule)},
  { path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) }, 
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
