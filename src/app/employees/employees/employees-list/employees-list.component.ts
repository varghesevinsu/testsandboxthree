import { Component, OnInit,inject } from '@angular/core';
import { EmployeesListBaseComponent } from '@baseapp/employees/employees/employees-list/employees-list.base.component';
import { EmployeesService } from '@baseapp/employees/employees/employees.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: '../../../../../base/app/employees/employees/employees-list/employees-list.component.html',
  styleUrls: ['./employees-list.scss']
})
export class EmployeesListComponent extends EmployeesListBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}
