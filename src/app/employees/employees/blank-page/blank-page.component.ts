import { Component, OnInit,inject } from '@angular/core';
import { BlankPageBaseComponent } from '@baseapp/employees/employees/blank-page/blank-page.base.component';
import { EmployeesService } from '@baseapp/employees/employees/employees.service';


@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.scss']
})
export class BlankPageComponent extends BlankPageBaseComponent implements OnInit {
 
  toggleHelloWorld(){
    $('#hworld').toggleClass('d-none')
  }
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}
