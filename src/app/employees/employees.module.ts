import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesBaseModule } from '@baseapp/employees/employees.base.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EmployeesBaseModule,
    EmployeesRoutingModule
    
  ],
  exports: [
      EmployeesBaseModule,
  ]

})
export class EmployeesModule  { }