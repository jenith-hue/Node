import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars/cars.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule
  ]
})
export class CarsModule { }
