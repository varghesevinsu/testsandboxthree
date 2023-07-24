import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

import { EmployeesDetailComponent } from '@app/employees/employees/employees-detail/employees-detail.component';
import { EmployeesListComponent } from '@app/employees/employees/employees-list/employees-list.component';
import { BlankPageComponent } from '@app/employees/employees/blank-page/blank-page.component';
import { CustomlistpageComponent } from '@app/employees/employees/customlistpage/customlistpage.component';

export const routes: Routes = [

{
     path: 'employeesdetail',
     component: EmployeesDetailComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "EMPLOYEES_DETAIL",
        breadcrumb: "EMPLOYEES_DETAIL",
        roles : [
        			"all"
				]
     }
},
{
     path: 'employeeslist',
     component: EmployeesListComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "EMPLOYEES_LIST",
        breadcrumb: "EMPLOYEES_LIST",
        roles : [
        			"all"
				]
     }
},
{
     path: 'blankpage',
     component: BlankPageComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "BLANK_PAGE",
        breadcrumb: "BLANK_PAGE",
        roles : [
        			"all"
				]
     }
},
{
     path: 'customlistpage',
     component: CustomlistpageComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "CUSTOMLISTPAGE",
        breadcrumb: "CUSTOMLISTPAGE",
        roles : [
        			"all"
				]
     }
}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EmployeesBaseRoutingModule
{
}
