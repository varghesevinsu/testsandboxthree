import { Component, OnInit, inject } from '@angular/core';
import { EmployeesDetailBaseComponent } from '@baseapp/employees/employees/employees-detail/employees-detail.base.component';
import { EmployeesService } from '@baseapp/employees/employees/employees.service';


@Component({
  selector: 'app-employees-detail',
  templateUrl: '../../../../../base/app/employees/employees/employees-detail/employees-detail.component.html',
  styleUrls: ['./employees-detail.scss']
})
export class EmployeesDetailComponent extends EmployeesDetailBaseComponent implements OnInit {

  override actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof EmployeesDetailBaseComponent, ' '> = methodName;
    if (btn.label.toLowerCase() === "change_field_label") {
      this.changeFieldLabels();
    } else if(btn.label.toLowerCase() === "set_focus_on_status") {
      $('#status input').focus();
    } else {
      if (btn.action === 'navigate_to_page' && btn.pageName?.url) {
        this.router.navigateByUrl(btn.pageName.url);
      }
      else if (typeof this[action] === "function") {
        this[action]();
      }
    }
  }

  changeFieldLabels() {
    $('.col-form-label').each(function(e:any) {
      if(this.textContent?.includes("Some custom labels")){
        const txt = " Some custom labels";
        this.textContent = this.textContent.replace(txt, "");
      } else {
        this.textContent = this.textContent + " Some custom labels";
      }
    });

   
  }

  override onwfSubmit() {
    this.comments = this.comments + " Some modified comments";
    //any other custom logic can be written here
    this.onwfSubmit();
  }

  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }

}
