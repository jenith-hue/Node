import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from  './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then((m) =>{ return m.RegisterModule} )},
  {path: 'cars', loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule),canActivate: [AuthGuard]},
  {path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule),canActivate: [AuthGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
