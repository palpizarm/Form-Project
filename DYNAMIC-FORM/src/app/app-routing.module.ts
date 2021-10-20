import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'accounts/users', component: UsersComponent},

  {path: '**', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
