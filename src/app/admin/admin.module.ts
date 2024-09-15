import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutAdminModule } from './layout-admin/layout-admin.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategorieComponent } from './categorie/categorie.component';
import { FormCategoryComponent } from './categorie/pages/form-category/form-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsCategoryComponent } from './categorie/pages/details-category/details-category.component';
import { ProduitModule } from './produit/produit.module';
import { CommandeModule } from './commande/commande.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';
import { RetoursModule } from './retours/retours.module';

@NgModule({
  declarations: [
    DashboardComponent,
    CategorieComponent,
    FormCategoryComponent,
    DetailsCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutAdminModule,
    FormsModule,
    ReactiveFormsModule,
    ProduitModule,
    CommandeModule,
    PaymentModule,
    UserModule,
    RetoursModule
  ],
})
export class AdminModule { }
