import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { DetailsUserComponent } from './pages/details-user/details-user.component';
import { FormUserComponent } from './pages/form-user/form-user.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'form', component: FormUserComponent},
  {path: 'details/:id', component: DetailsUserComponent},
  {path: 'updateUser/:id', component: FormUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
