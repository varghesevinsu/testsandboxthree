import { NgModule } from '@angular/core';
import { DepartmentsDetailComponent } from '@app/departments/departments/departments-detail/departments-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { DepartmentsListComponent } from '@app/departments/departments/departments-list/departments-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WidgetsBaseModule } from '@baseapp/widgets/widgets.base.module';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';
import { ExportsModule } from '@app/exports/exports.module';
import { ImportsModule } from '@app/imports/imports.module';

@NgModule({
  declarations: [
DepartmentsListComponent,
DepartmentsDetailComponent
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
DepartmentsListComponent,
DepartmentsDetailComponent
],

providers: [
BsModalService,
CanDeactivateGuard
],
  
})
export class DepartmentsBaseModule { }