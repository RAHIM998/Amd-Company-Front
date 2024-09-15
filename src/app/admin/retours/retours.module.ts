import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetoursRoutingModule } from './retours-routing.module';
import { RetourComponent } from './pages/retour/retour.component';
import { DetailsRetourComponent } from './pages/details-retour/details-retour.component';


@NgModule({
  declarations: [
    RetourComponent,
    DetailsRetourComponent
  ],
  imports: [
    CommonModule,
    RetoursRoutingModule
  ],exports: [
    RetourComponent,
    DetailsRetourComponent
  ]
})
export class RetoursModule { }
