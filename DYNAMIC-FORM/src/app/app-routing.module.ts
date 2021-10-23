import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'accounts/users', component: UsersComponent},
  {path: 'accounts/new', component: NewUserComponent},
  {path: 'forms', component: FormListComponent},
  {path: 'create-form', component: FormTemplateComponent},

  {path: '**', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
