import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsBaseModule } from '@baseapp/widgets/widgets.base.module';
import { ImportErrorDetailsComponent } from '@app/imports/import-error-details/import-error-details.component';
import { ImportPageComponent } from '@app/imports/import-page/import-page.component';
import { ImportHistoryComponent } from '@app/imports/import-history/import-history/import-history.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ImportPageComponent,
    ImportErrorDetailsComponent,
    ImportHistoryComponent

  ],
  imports: [
    CommonModule,
    WidgetsBaseModule,
    SharedModule
  ],
  exports: [
    SharedModule,
    ImportPageComponent,
    ImportErrorDetailsComponent,
    ImportHistoryComponent
  ]
})
export class ImportsBaseModule { }
