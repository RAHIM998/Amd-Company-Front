import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetourComponent } from './pages/retour/retour.component';
import { DetailsRetourComponent } from './pages/details-retour/details-retour.component';

const routes: Routes = [
  {path: '', component: RetourComponent},
  {path: 'detailsRetour/:id', component: DetailsRetourComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetoursRoutingModule { }
