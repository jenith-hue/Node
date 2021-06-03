import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionpageComponent } from './questionpage/questionpage.component';

const routes: Routes = [
  {path : ':id',component :QuestionpageComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionpageRoutingModule { }
