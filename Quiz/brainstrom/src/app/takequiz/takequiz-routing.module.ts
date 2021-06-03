import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TakequizComponent} from './takequiz/takequiz.component';

const routes: Routes = [
  {path : '',component :TakequizComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakequizRoutingModule { }
