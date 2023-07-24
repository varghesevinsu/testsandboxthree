import { EmployeesService } from '../employees.service';
import { EmployeesBase} from '../employees.base.model';
import { Directive, EventEmitter, Input, Output, SecurityContext, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppUtilBaseService } from '@baseapp/app-util.base.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChangeLogsComponent } from '@baseapp/widgets/change-logs/change-logs.component'
import { EmployeesApiConstants } from '@baseapp/employees/employees/employees.api-constants';

@Directive(
{
	providers:[MessageService, ConfirmationService, DialogService]
}
)
export class BlankPageBaseComponent{
	
	bsModalRef?: BsModalRef;
	isChildPage:boolean = false;

	
	


	enableChildOptions(){
	}
	calculateFormula(){
	
}

    onInit() {
    }
	
     onDestroy() {
    }
     onAfterViewInit() {
    }

}
