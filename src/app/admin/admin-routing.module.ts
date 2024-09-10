import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategorieComponent } from './categorie/categorie.component';
import { FormCategoryComponent } from './categorie/pages/form-category/form-category.component';
import { DetailsCategoryComponent } from './categorie/pages/details-category/details-category.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'categorie', component: CategorieComponent},
  {path: 'form-category', component: FormCategoryComponent},
  {path: 'update-category/:id', component: FormCategoryComponent},
  {path: 'details-category/:id', component: DetailsCategoryComponent},
  {path: 'produit', loadChildren:() => import('./produit/produit.module').then(m => m.ProduitModule)},
  {path: 'commande', loadChildren:() => import('./commande/commande.module').then(m => m.CommandeModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
