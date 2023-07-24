import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

import { DepartmentsListComponent } from '@app/departments/departments/departments-list/departments-list.component';
import { DepartmentsDetailComponent } from '@app/departments/departments/departments-detail/departments-detail.component';

export const routes: Routes = [

{
     path: 'departmentslist',
     component: DepartmentsListComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "DEPARTMENTS_LIST",
        breadcrumb: "DEPARTMENTS_LIST",
        roles : [
        			"all"
				]
     }
},
{
     path: 'departmentsdetail',
     component: DepartmentsDetailComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "DEPARTMENTS_DETAIL",
        breadcrumb: "DEPARTMENTS_DETAIL",
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
export class DepartmentsBaseRoutingModule
{
}
