import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from "./auth.guard";
import { MyaccountComponent } from './myaccount/myaccount.component';

const routes: Routes = [
  {path: '',redirectTo:'/Login',pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Registration', component: RegistrationComponent},
  {path: 'Dashboard', component: UserProfileComponent ,  canActivate: [AuthGuard]},
  {path : 'Myaccount', component: MyaccountComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
