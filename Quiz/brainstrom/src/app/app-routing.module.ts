import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from  './auth.guard';

const routes: Routes = [
 // { path: '', redirectTo: 'landing', pathMatch: 'full'},canActivate: [AuthGuard]
  {path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then((m) =>{ return m.RegisterModule})},
  {path: 'userpage', loadChildren: () => import('./userpage/userpage.module').then(m => m.UserpageModule),canActivate: [AuthGuard]},
  {path: 'takequiz', loadChildren: () => import('./takequiz/takequiz.module').then(m => m.TakequizModule),canActivate: [AuthGuard]},
  {path: 'adminpage', loadChildren: () => import('./adminpage/adminpage.module').then(m => m.AdminpageModule),canActivate: [AuthGuard]},
  {path: 'questionpage', loadChildren: () => import('./questionpage/questionpage.module').then(m => m.QuestionpageModule)}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
