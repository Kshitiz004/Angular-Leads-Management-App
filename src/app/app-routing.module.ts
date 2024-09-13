import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeadsComponent } from './leads/leads.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'leads', component: LeadsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
