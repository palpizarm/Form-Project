import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ReceivedFormsComponent } from './components/received-forms/received-forms.component';
import { UserFormsAccessComponent } from './components/user-forms-access/user-forms-access.component';
import { UsersComponent } from './components/users/users.component';
import { AdminLogedGuard } from './guards/admin-loged.guard';
import { IsLoginGuard } from './guards/is-login.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'home', component: DashboardComponent, canActivate: [IsLoginGuard]},
  {path: 'accounts/users', component: UsersComponent, canActivate: [IsLoginGuard, AdminLogedGuard]},
  {path: 'accounts/new', component: NewUserComponent, canActivate: [IsLoginGuard, AdminLogedGuard]},
  {path: 'forms', component: FormListComponent, canActivate: [IsLoginGuard]},
  {path: 'create-form-template', component: FormTemplateComponent, canActivate: [IsLoginGuard, AdminLogedGuard]},
  {path: 'fill-form', component: FormComponent, canActivate: [IsLoginGuard]},
  {path: 'received-forms-list', component: ReceivedFormsComponent, canActivate: [IsLoginGuard]},
  {path: 'user-forms-access/:user', component: UserFormsAccessComponent, canActivate: [IsLoginGuard, AdminLogedGuard]},

  {path: '**', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
