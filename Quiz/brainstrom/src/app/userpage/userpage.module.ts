import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserpageRoutingModule } from './userpage-routing.module';
import { UserpageComponent } from './userpage/userpage.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UserpageComponent],
  imports: [
    CommonModule,
    UserpageRoutingModule,
    SharedModule
  ]
})
export class UserpageModule { }
