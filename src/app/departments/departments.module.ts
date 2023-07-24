import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsBaseModule } from '@baseapp/departments/departments.base.module';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    DepartmentsBaseModule,
    DepartmentsRoutingModule
    
  ],
  exports: [
      DepartmentsBaseModule,
  ]

})
export class DepartmentsModule  { }