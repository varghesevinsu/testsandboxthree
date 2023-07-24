import { Component, OnInit, inject } from '@angular/core';
import { DepartmentsListBaseComponent } from '@baseapp/departments/departments/departments-list/departments-list.base.component';
import { DepartmentsService } from '@baseapp/departments/departments/departments.service';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { DepartmentsDetailComponent } from '../departments-detail/departments-detail.component';
import { ChangeLogsComponent } from '@baseapp/widgets/change-logs/change-logs.component';


@Component({
  selector: 'app-departments-list',
  templateUrl: '../../../../../base/app/departments/departments/departments-list/departments-list.component.html',
  styleUrls: ['./departments-list.scss']
})
export class DepartmentsListComponent extends DepartmentsListBaseComponent implements OnInit {

  override onNew() {
    const value: any = "parentId";
    let property: Exclude<keyof DepartmentsListBaseComponent, ''> = value;
    if (this.isChildPage && this[property]) {
      const methodName: any = "onNewChild";
      let action: Exclude<keyof DepartmentsListBaseComponent, ''> = methodName;
      if (typeof this[action] == "function") {
        this[action]();
      }
    }
    else {
      //this.router.navigate(['../departmentsdetail'], { relativeTo: this.activatedRoute });
      this.openCustomModalPopup();
    }
  }

  openCustomModalPopup() {
    this.bsModalRef = this.bsModalService.show(DepartmentsDetailComponent, Object.assign({}, { class: 'modal-xl modal-changelog' }));
  }

  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }

}
