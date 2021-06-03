import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { DatagridComponent } from './datagrid/datagrid.component';
import { CookieModule } from 'ngx-cookie';


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
    DatagridComponent,
    CookieModule
  ]
})
export class SharedModule { }
