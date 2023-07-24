import { NgModule } from '@angular/core';
import { BlankPageComponent } from '@app/employees/employees/blank-page/blank-page.component';
import { CustomlistpageComponent } from '@app/employees/employees/customlistpage/customlistpage.component';
import { SharedModule } from '@app/shared/shared.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EmployeesDetailComponent } from '@app/employees/employees/employees-detail/employees-detail.component';
import { WidgetsBaseModule } from '@baseapp/widgets/widgets.base.module';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';
import { EmployeesListComponent } from '@app/employees/employees/employees-list/employees-list.component';
import { ExportsModule } from '@app/exports/exports.module';
import { ImportsModule } from '@app/imports/imports.module';

@NgModule({
  declarations: [
EmployeesDetailComponent,
EmployeesListComponent,
BlankPageComponent,
CustomlistpageComponent
],
imports: [
SharedModule,
WidgetsBaseModule,
ImportsModule,
ExportsModule
],

exports: [
SharedModule,
WidgetsBaseModule,
EmployeesDetailComponent,
EmployeesListComponent,
BlankPageComponent,
CustomlistpageComponent
],

providers: [
BsModalService,
CanDeactivateGuard
],
  
})
export class EmployeesBaseModule { }