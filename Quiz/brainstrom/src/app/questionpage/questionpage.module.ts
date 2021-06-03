import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionpageRoutingModule } from './questionpage-routing.module';
import { QuestionpageComponent } from './questionpage/questionpage.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [QuestionpageComponent],
  imports: [
    CommonModule,
    QuestionpageRoutingModule,
    SharedModule
  ]
})
export class QuestionpageModule { }
