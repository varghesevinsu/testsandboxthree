import { Component, OnInit,inject } from '@angular/core';
import { DepartmentsDetailBaseComponent } from '@baseapp/departments/departments/departments-detail/departments-detail.base.component';
import { DepartmentsService } from '@baseapp/departments/departments/departments.service';


@Component({
  selector: 'app-departments-detail',
  templateUrl: '../../../../../base/app/departments/departments/departments-detail/departments-detail.component.html',
  styleUrls: ['./departments-detail.scss']
})
export class DepartmentsDetailComponent extends DepartmentsDetailBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}
