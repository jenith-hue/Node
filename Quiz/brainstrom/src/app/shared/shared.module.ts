import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { DatagridComponent } from './datagrid/datagrid.component';



@NgModule({
  declarations: [DatagridComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CookieModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    CookieModule,
    DatagridComponent
  ]
})
export class SharedModule { }
