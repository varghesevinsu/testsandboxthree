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
import { DepartmentsApiConstants } from '@baseapp/departments/departments/departments.api-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppConstants } from '@app/app-constants';
import { BaseService } from '@baseapp/base.service';
import { fromEvent, Subscription, map } from 'rxjs';
import { allowedValuesValidator } from '@baseapp/widgets/validators/allowedValuesValidator';
import { environment } from '@env/environment';
import { Filter } from '@baseapp/vs-models/filter.model';
import { AppGlobalService } from '@baseapp/app-global.service';
import { GridComponent } from '@baseapp/widgets/grid/grid.component';

@Directive(
{
	providers:[MessageService, ConfirmationService, DialogService]
}
)
export class CustomlistpageBaseComponent{
	
	
	quickFilter: any;
hiddenFields:any = {};
quickFilterFieldConfig:any={}
	bsModalRef?: BsModalRef;
	isSearchFocused:boolean = false;
showBreadcrumb = AppConstants.showBreadcrumb;
	
filteredItemstableSearchdepartment:any = [];
isAutoSuggestCallFiredtableSearchdepartment: boolean = false;
	  selectedValues: any[] = [];
  filter: Filter = {
    globalSearch: '',
    advancedSearch: {},
    sortField: null,
    sortOrder: null,
    quickFilter: {}
  };
params: any;
isMobile: boolean = AppConstants.isMobile;

  gridData: EmployeesBase[] = [];
  totalRecords: number = 0;
  subscriptions: Subscription[] = [];
 multiSortMeta:any =[];
 selectedColumns:any =[];
subHeader: any;
  autoSuggest: any;
  query: any;

rightFreezeColums:any;
total:number =0;
inValidFields:any = {};
selectedItems:any ={};
scrollTop:number =0;
isRowSelected: boolean = false;
isPrototype = environment.prototype;
  workFlowEnabled = false;
isList = true;
isPageLoading:boolean = false;
autoSuggestPageNo:number = 0;
complexAutoSuggestPageNo:number = 0
localStorageStateKey = "customlistpage";
showMenu: boolean = false;
conditionalActions:any ={
  disableActions:[],
  hideActions:[]
}
actionBarConfig:any =[];
first: number =0;
rows: number = 0;
updatedRecords:EmployeesBase[] = [];
showPaginationOnTop = AppConstants.showPaginationonTop;
 showPaginationOnBottom = AppConstants.showPaginationonBottom;
 tableFieldConfig:any ={};
dateFormat: string = AppConstants.calDateFormat;
selectedRowId: any = '';
 showWorkflowSimulator:boolean = false;
 gridConfig: any = {};
  @ViewChild(GridComponent)
  private gridComponent: any = GridComponent;
separator = ".";
timeFormatPrimeNG: string = AppConstants.timeFormatPrimeNG;
dateFormatPrimeNG: string = AppConstants.dateFormatPrimeNG ;
minFraction = AppConstants.minFraction;
maxFraction = AppConstants.maxFraction;
currency = AppConstants.currency;
currencyDisplay = AppConstants.currencyDisplay;
	isChildPage:boolean = false;
	
showAdvancedSearch: boolean = false;

tableSearchFieldConfig:any = {};
@ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
 filtersApplied:boolean = false;

	
	leftActionBarConfig : any = {
  "children" : [ {
    "outline" : "true",
    "buttonType" : "icon_on_left",
    "visibility" : "show",
    "showOn" : "both",
    "buttonStyle" : "curved",
    "action" : "new",
    "buttonEnabled" : "yes",
    "label" : "NEW",
    "type" : "button"
  }, {
    "outline" : "true",
    "buttonType" : "icon_only",
    "visibility" : "show",
    "showOn" : "both",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-trash-alt",
        "value" : "fas fa-trash-alt"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "action" : "delete",
    "buttonEnabled" : "yes",
    "label" : "DELETE",
    "type" : "button"
  }, {
    "outline" : "true",
    "buttonType" : "icon_only",
    "visibility" : "show",
    "showOn" : "both",
    "buttonStyle" : "curved",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fas fa-sync",
        "value" : "fas fa-sync"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "action" : "refresh",
    "buttonEnabled" : "yes",
    "label" : "REFRESH",
    "type" : "button"
  }, {
    "outline" : true,
    "children" : [ {
      "buttonType" : "icon_on_left",
      "visibility" : "show",
      "showOn" : "both",
      "buttonStyle" : "curved",
      "icon" : {
        "type" : "icon",
        "icon" : {
          "label" : "fa fa-download",
          "value" : "fa fa-download"
        },
        "iconColor" : "#000000",
        "iconSize" : "13px"
      },
      "action" : "import",
      "buttonEnabled" : "yes",
      "label" : "IMPORT",
      "type" : "button"
    }, {
      "buttonType" : "icon_on_left",
      "visibility" : "show",
      "showOn" : "both",
      "buttonStyle" : "curved",
      "icon" : {
        "type" : "icon",
        "icon" : {
          "label" : "fa fa-upload",
          "value" : "fa fa-upload"
        },
        "iconColor" : "#000000",
        "iconSize" : "13px"
      },
      "action" : "export",
      "buttonEnabled" : "yes",
      "label" : "EXPORT",
      "type" : "button"
    } ],
    "buttonStyle" : "curved",
    "displayCount" : 0,
    "label" : "TEST",
    "type" : "buttonGroup"
  } ]
}
	rightActionBarConfig : any = {
  "children" : [ ]
}
	tableSearchConfig : any = {
  "children" : [ {
    "label" : "EMPLOYEE_NAME",
    "data" : "",
    "field" : "employeeName",
    "type" : "searchField",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "employeeName",
    "uiType" : "text",
    "name" : "employeeName",
    "isPrimaryKey" : false,
    "fieldName" : "employeeName"
  }, {
    "label" : "DEPARTMENT",
    "data" : "",
    "field" : "department",
    "type" : "searchField",
    "fieldType" : "any",
    "multipleValues" : false,
    "lookupFields" : [ "departmentName", "departmentCode" ],
    "functionalPrimaryKey" : [ "departmentCode" ],
    "displayField" : "departmentCode",
    "lookupUrl" : "departments/autosuggest",
    "fieldId" : "department",
    "uiType" : "autosuggest",
    "name" : "department",
    "isPrimaryKey" : false,
    "fieldName" : "department"
  }, {
    "label" : "STATUS",
    "data" : "",
    "field" : "status",
    "type" : "searchField",
    "fieldType" : "string",
    "multipleValues" : false,
    "uiType" : "select",
    "allowedValues" : {
      "values" : [ {
        "label" : "DRAFT",
        "value" : "DRAFT"
      }, {
        "label" : "INACTIVE",
        "value" : "INACTIVE"
      }, {
        "label" : "ACTIVE",
        "value" : "ACTIVE"
      } ],
      "conditions" : {
        "conditionType" : "None",
        "conditions" : [ ]
      }
    },
    "fieldId" : "status",
    "defaultVal" : "DRAFT",
    "name" : "status",
    "isPrimaryKey" : false,
    "fieldName" : "status"
  } ],
  "columns" : "2",
  "type" : "tableSearch",
  "showAdvancedSearch" : true
}
	quickFilterConfig : any = {
  "children" : [ ]
}
	customRenderConfig : any = {
  "children" : [
     ]
}
	tableConfig : any = {
  "recordSelection" : "multiple_records",
  "striped" : true,
  "rightFreezeFromColumn" : "0",
  "infiniteScroll" : "false",
  "viewAs" : "list",
  "hoverStyle" : "box",
  "tableStyle" : "style_2",
  "type" : "grid",
  "showDetailPageAs" : "navigate_to_new_page",
  "leftFreezeUptoColumn" : "0",
  "pageLimit" : "50",
  "children" : [ {
    "label" : "EMPLOYEE_NAME",
    "data" : "",
    "field" : "employeeName",
    "type" : "gridColumn",
    "width" : "120px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "employeeName",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "employeeName",
    "isPrimaryKey" : false,
    "fieldName" : "employeeName"
  }, {
    "label" : "DEPARTMENT",
    "data" : "",
    "field" : "department",
    "type" : "gridColumn",
    "width" : "120px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "any",
    "multipleValues" : false,
    "lookupFields" : [ "departmentName", "departmentCode" ],
    "functionalPrimaryKey" : [ "departmentCode" ],
    "displayField" : "departmentCode",
    "lookupUrl" : "departments/autosuggest",
    "fieldId" : "department",
    "timeOnly" : false,
    "uiType" : "autosuggest",
    "name" : "department",
    "isPrimaryKey" : false,
    "fieldName" : "department"
  }, {
    "label" : "STATUS",
    "data" : "",
    "field" : "status",
    "type" : "gridColumn",
    "width" : "120px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "uiType" : "select",
    "allowedValues" : {
      "values" : [ {
        "label" : "DRAFT",
        "value" : "DRAFT"
      }, {
        "label" : "INACTIVE",
        "value" : "INACTIVE"
      }, {
        "label" : "ACTIVE",
        "value" : "ACTIVE"
      } ],
      "conditions" : {
        "conditionType" : "None",
        "conditions" : [ ]
      }
    },
    "fieldId" : "status",
    "timeOnly" : false,
    "name" : "status",
    "isPrimaryKey" : false,
    "fieldName" : "status"
  } ],
  "sorting" : "single_column",
  "detailPageNavigation" : "click_of_the_row",
  "rowSpacing" : "medium",
  "rowHeight" : "medium"
}
	pageViewTitle: string = 'CUSTOMLISTPAGE';
	
		tableSearchControls : UntypedFormGroup = new UntypedFormGroup({
	status: new UntypedFormControl('',[]),
	department: new UntypedFormControl('',[]),
	employeeName: new UntypedFormControl('',[]),
});

		quickFilterControls : UntypedFormGroup = new UntypedFormGroup({
});


	public employeesService = inject(EmployeesService);
public appUtilBaseService = inject(AppUtilBaseService);
public translateService = inject(TranslateService);
public messageService = inject(MessageService);
public confirmationService = inject(ConfirmationService);
public dialogService = inject(DialogService);
public domSanitizer = inject(DomSanitizer);
public bsModalService = inject(BsModalService);
public activatedRoute = inject(ActivatedRoute);
public renderer2 = inject(Renderer2);
public router = inject(Router);
public appGlobalService = inject(AppGlobalService);
public baseService = inject(BaseService);
	

	
	getDisabled(formControl: FormGroup, ele: string) {
  const parent = ele.split('?.')[0];
  if (formControl.controls[parent] instanceof FormGroup){
    return formControl.get(ele)?.disabled
  }
  else
    return formControl.controls[parent].disabled;
}
	onRefresh(fromDelete?:boolean): void {
    const fromDel = fromDelete || false;
    const params = this.assignTableParams();
    this.gridComponent.refreshGrid(params,fromDel);
  }
	getGridConfig() {
    const self = this
    return {
      data: this.gridData,
      columns: this.getColumns(),
      ajaxUrl: EmployeesApiConstants.getDatatableData,
      select: true,
      colReorder: (String(this.tableConfig?.columnReorder)?.toLowerCase() === 'true'),
     detailPageNavigation: (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_of_the_row' ? 'row_click' : (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_on_navigate_icon' ? 'row_edit' : '')),
      toggleColumns: (String(this.tableConfig?.toggleColumns)?.toLowerCase() === 'true'),
      paging: !(String(this.tableConfig?.infiniteScroll)?.toLowerCase() === 'true'),
      scrollX: true,
      scrollCollapse: true,
      pageLength: parseInt(String(this.tableConfig?.pageLimit)),
      deferRender: true,
      ordering: true,
      sortField: this.tableConfig.sortField,
      sortOrder: this.tableConfig.sortOrder,
      colResize: (String(this.tableConfig?.columnResize)?.toLowerCase() === 'true'),
      disableSelection: ((this.tableConfig?.recordSelection?.toLowerCase() == 'multiple_records' || this.tableConfig?.recordSelection?.toLowerCase() == 'single_record_only') ? false : true),
      recordSelection: (this.tableConfig?.recordSelection?.toLowerCase() == 'multiple_records' ? 'multi' : (this.tableConfig?.recordSelection?.toLowerCase() == 'single_record_only' ? 'single' : '')),
      bFilter: false,
      enterKeytoSearch: false,
      showGridlines:this.tableConfig.showGridlines,
      striped:this.tableConfig.striped,
      rowSpacing:this.tableConfig.rowSpacing,
      rowHeight:this.tableConfig.rowHeight,
rowGrouping: jQuery.isEmptyObject(this.tableConfig?.groupOnColumn) ? '' : this.tableConfig?.groupOnColumn?.name,
sortSeparator:this.separator,
      fixedColumns: {
        left: parseInt(String(this.tableConfig?.leftFreezeUptoColumn || '0') ),
        right: parseInt(String(this.tableConfig?.rightFreezeFromColumn || '0') )
      },
     isChildPage: this.isChildPage,
      parentId: this.getParentId(),
      uniqueIdentifier:this.tableConfig?.uniqueIdentifier|| null,
      onRowMenuClick: (option: any, row: any, data: any) => {
      },

      onRowSelect: (selectedRows: any, id: any) => {
        this.getSelectedvalues(selectedRows, id);
      },
      onRowDeselect: (selectedRows: any) => {
        this.getSelectedvalues(selectedRows, '');
      },
      onRowClick: (event: any, id: string) => {
        this.onUpdate(id, event);

      },
      drawCallback: (settings: any, apiScope: any) => {
        this.onDrawCallback(settings, apiScope);
      }
    };

  }

  onDrawCallback(settings: any, apiScope: any) {
    // Function that is called every time DataTables performs a draw.
  }

  getSelectedvalues(selectedRows: any, id: string) {
    let sids: any = selectedRows?.data();
    this.selectedValues = [];
    sids?.map((obj: any) => {
      this.selectedValues.push(obj.sid)
    })
   if (this.selectedValues.length > 0) {
      this.isRowSelected = true;
    } else if (this.selectedValues.length <= 0) {
      this.isRowSelected = false;
    }
  }
  getColumns() {
   const json1 = this.tableConfig.children ||[];
    const json2 = this.customRenderConfig.children ||[];
    let merged = [];
    for (let i = 0; i < json1.length; i++) {
      merged.push({
        ...json1[i],
        ...(json2.find((itmInner: any) => itmInner.fieldName === json1[i].fieldName))
      });
    }
    return merged;
  }
showToastMessage(config: object) {
    this.messageService.add(config);
  }
getParentId() {
  const value: any = "parentId";
  let property: Exclude<keyof CustomlistpageBaseComponent, ' '> = value;
  if (this.isChildPage) {
    if (this[property]) {
      return this[property];
    } else {
      return false;
    }
  }
}
	deattachScroll() {
  }
	getSelectedObject(field:string,options:any){
      const selectedObj = (options.filter((item: { label: any}) => (item.label)?.toUpperCase() === field?.toUpperCase()));
      return selectedObj[0];
  }
	clearAllFilters() {
  this.filter.globalSearch = '';
  this.clearFilterValues();
}
	attachInfiniteScrollForAutoCompletetableSearchdepartment(fieldName:string) {
    const tracker = (<HTMLInputElement>document.getElementsByClassName('p-autocomplete-panel')[0])
    let windowYOffsetObservable = fromEvent(tracker, 'scroll').pipe(map(() => {
      return Math.round(tracker.scrollTop);
    }));

    const autoSuggestScrollSubscription = windowYOffsetObservable.subscribe((scrollPos: number) => {
      if ((tracker.offsetHeight + scrollPos >= tracker.scrollHeight)) {
        this.isAutoSuggestCallFiredtableSearchdepartment = false;
          if(this.filteredItemstableSearchdepartment.length  >= this.autoSuggestPageNo * AppConstants.defaultPageSize){
            this.autoSuggestPageNo = this.autoSuggestPageNo + 1;
          }
         const methodName: any = `autoSuggestSearchtableSearchdepartment`
        let action: Exclude<keyof CustomlistpageBaseComponent, ' '> = methodName;
        this[action]();
      }
    });
    this.subscriptions.push(autoSuggestScrollSubscription);
  }
	unSelect(event:any,field:string,multiple:boolean,rowIndex?:number){
    field = field.replace('?.','_');
if(rowIndex!= undefined && rowIndex>=0)
    field = `${field}_${rowIndex}`;
 if(multiple){
    this.selectedItems[field]?.forEach((item:any,index:number)=>{
        if(item.id === event.sid){
            this.selectedItems[field].splice(index,1);
        }
    })
}else{
 this.selectedItems[field] =[];
}
  }
	getValue(formControl: FormGroup, ele: string) {
    const parent = ele.split('?.')[0];
    if (formControl.controls[parent] instanceof FormGroup){
      const child = ele.split('?.')[1];
      return formControl.controls[parent].value[child];
    }
    else
      return formControl.controls[parent].value;
  }
	autoSuggestSearchtableSearchdepartment(event?: any, col?: any,url?:any) {
if(!this.isAutoSuggestCallFiredtableSearchdepartment){
      this.isAutoSuggestCallFiredtableSearchdepartment = true;
    let apiObj = Object.assign({}, DepartmentsApiConstants.autoSuggestService);
     const urlObj = {
        url: (url || apiObj.url),
         searchText: (event && this.tableSearchControls.controls['department'].value) ? event.query == this.tableSearchControls.controls['department'].value[col.displayField] ? ' ':event.query: (event ? event.query : ' '),  
        colConfig: col,
        value: this.tableSearchControls.getRawValue(),
        pageNo:this.autoSuggestPageNo
      }
    apiObj.url = this.appUtilBaseService.generateDynamicQueryParams(urlObj);
   const sub =  this.baseService.get(apiObj).subscribe((res: any) => {
      this.isAutoSuggestCallFiredtableSearchdepartment = false;
          let updateRecords = [];
          if(event && event.query) {
                updateRecords =  [...res];
          } else {
                updateRecords =  [...this.filteredItemstableSearchdepartment, ...res];
          }
      const ids = updateRecords.map(o => o.sid)
      this.filteredItemstableSearchdepartment = updateRecords.filter(({ sid }, index) => !ids.includes(sid, index + 1));
          this.filteredItemstableSearchdepartment = this.formatFilteredData(this.filteredItemstableSearchdepartment, 'department');
    }, (err: any) => {
      this.isAutoSuggestCallFiredtableSearchdepartment = false;
    })
this.subscriptions.push(sub);}
 }
	formatAutoComplete(item:any,displayField:string,formControlName:string){
     return ((item && item[displayField]) ? item[displayField] : '');
  }
	filterSearch() {
    this.quickFilterControls.valueChanges.subscribe((value) => {
      for (let control of this.quickFilterConfig.children) {
        if (control.uiType === 'autosuggest' && AppConstants.isSql) {
          control.mapping?.map((o: any, index: number) => {
            if (o.isApplicable && !this.hiddenFields[o.childField] && value[control.fieldName] && value[control.fieldName][o.parentField]) {
              this.quickFilterControls.get([o.childField])?.patchValue(value[control.fieldName][o.parentField], { emitEvent: false });
            }
          })
        }
      }
      let filterVals = { ... this.quickFilterControls.value };
      let hasDates = this.quickFilterConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "date" || e.fieldType.toLowerCase() == "datetime");
      if (hasDates.length > 0) {
        hasDates.forEach((f: any) => {
          let field = f.name;
          let dateVal = value[field];
          if (!dateVal) delete filterVals[field];
          if (dateVal && Array.isArray(dateVal)) {
            let val = { lLimit: dateVal[0].getTime(), uLimit: dateVal[1] ? dateVal[1].getTime() : dateVal[1], type: "Date" }
            filterVals[field] = val;
            if (dateVal[0] == null && dateVal[1] == null) {
              delete filterVals[field];
            }
          }
        });
      }
      let hasNumbers = this.quickFilterConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "number" || e.fieldType.toLowerCase() == "double");
      if (hasNumbers.length > 0) {
        hasNumbers.forEach((f: any) => {
          let field = f.name;
          let numberValue = value[field];
          if (numberValue && !Array.isArray(numberValue)) {
            filterVals[field] = {
              lLimit: numberValue.min, uLimit: numberValue.max, type: "Number"
            }
            if (numberValue.min == null && numberValue.max == null) {
              delete filterVals[field];
            }
          }
        });
      }
      this.filter.quickFilter = filterVals;
      this.onRefresh();
    });
  }
	enableChildOptions(){
	}
	onNew() {
	const value: any = "parentId";
	let property: Exclude<keyof CustomlistpageBaseComponent, ''> = value;
	if (this.isChildPage && this[property]) {
		const methodName: any = "onNewChild";
		let action: Exclude<keyof CustomlistpageBaseComponent, ''> = methodName;
		if (typeof this[action] == "function") {
			this[action]();
		}
	}
	else {
		this.router.navigate(['../employeesdetail'], { relativeTo: this.activatedRoute});
	}
}
	onUpdate(id: any,event?:any) {
	if (this.tableConfig.detailPage?.url) {
      const value: any = "parentId";
       let property: Exclude<keyof CustomlistpageBaseComponent, ''> = value;
       const methodName: any = "onUpdateChild";
       let action: Exclude<keyof CustomlistpageBaseComponent, ''> = methodName;
       if (this.isChildPage && this[property]) {
	       if (typeof this[action] === "function") {
	        	this[action](id);
	         }
       }
       else {
       	this.router.navigateByUrl(this.tableConfig.detailPage.url + '?id=' + id)
       }
    }
}
	// closeAdvancedSearchPopup() {
  //   this.renderer2.listen('window', 'click', (e: Event) => {
  //     let clickedInside = this.menu?.nativeElement.contains(e.target);
  //     if(e.target !== this.toggleButton?.nativeElement&& !clickedInside &&this.showAdvancedSearch){
  //       this.showAdvancedSearch = false;
  //     }
  //   );
  // }
clearFilters(){
  this.filter.globalSearch = '';
  this.isSearchFocused = false;
}

focus(){
  this.isSearchFocused = !this.isSearchFocused;
}
	getSearchData(searchFields: any, config: any) {
        let searchData: any = {}
        for (const key in searchFields) {
            if (searchFields.hasOwnProperty(key) && searchFields[key]?.toString().length) {
                if (this.selectedItems.hasOwnProperty(key)) {
                    let lookupObj: any = [];
                    if (config[key].multiple) {
                        this.selectedItems[key].map((o: any) => lookupObj.push(o.id));
                    }
                    searchData[`${key}.id`] = config[key].multiple ? lookupObj : this.selectedItems[key][0].id;
                }
                else {
                    searchData[key] = searchFields[key];
                }
            }
        }
        return searchData;
    }

 assignTableParams() {
    const params: any = {};
    this.filter.sortField = this.tableConfig.groupOnColumn ? this.tableConfig.groupOnColumn?.name : this.filter.sortField;
    const searchData = { ...this.getSearchData(this.filter.advancedSearch, this.tableSearchFieldConfig), ...this.getSearchData(this.filter.quickFilter, this.quickFilterFieldConfig) }
    if (this.filter.globalSearch)
      searchData['_global'] = this.filter.globalSearch;

    if (this.filter.sortField && this.filter.sortOrder) {
    let columnName:any = null;
    this.tableConfig.children.map((ele: any) => {
      if (ele.uiType === "autosuggest" && this.filter.sortField === ele.name) {
        columnName = (ele.name + ".value." + ele.displayField);
      }
      else if(this.filter.sortField === ele.name){
        columnName = this.filter.sortField 
      }
      if(columnName){
        params.order = [{
          column: columnName,
          dir: this.filter.sortOrder
        }]
      }
      else{
        params.order = null;
      }
    })
  }
    else {
      params.order = null;
    }
    params.search = searchData;

    return params;
  }
 updateActions() {
        this.actionBarConfig = this.appUtilBaseService.getActionsConfig(this.leftActionBarConfig.children);
        this.actionBarConfig.forEach((actionConfig: any) => {
            if (actionConfig && actionConfig.visibility === 'conditional' && actionConfig.conditionForButtonVisiblity) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonVisiblity?.query?.rules, actionConfig.conditionForButtonVisiblity?.query?.condition);
                this.validateActions(actionConfig.action, conResult, 'view');
            }
            if (actionConfig && actionConfig.buttonEnabled === 'conditional' && actionConfig.conditionForButtonEnable) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonEnable?.query?.rules, actionConfig.conditionForButtonEnable?.query?.condition);
                this.validateActions(actionConfig.action, conResult, 'edit');
            }
        })
    }
    validateActions(label: string, result: boolean, action: string) {
        if (action === 'view') {
            if (result && this.conditionalActions.hideActions.includes(label))
                this.conditionalActions.hideActions?.splice(this.conditionalActions.hideActions?.indexOf(label), 1)
            else if (!result && !this.conditionalActions.hideActions.includes(label))
                this.conditionalActions.hideActions.push(label);
        }
        else if (action === 'edit') {
            if (result && this.conditionalActions.disableActions.includes(label))
                this.conditionalActions.disableActions.splice(this.conditionalActions.disableActions?.indexOf(label), 1);
            else if (!result && !this.conditionalActions.disableActions.includes(label))
                this.conditionalActions.disableActions.push(label);
        }
    }
  disablechildAction(pid?:any) {
      const value: any = "parentId";
      let property: Exclude<keyof CustomlistpageBaseComponent, ' '> = value;
        const parentId = this[property] || pid;
        this.leftActionBarConfig?.children?.map((ele: any) => {
          if (ele?.action === 'new' && !parentId && this.isChildPage && ele.buttonEnabled != 'conditional') {
            ele.buttonEnabled = 'no';
          }
          else if (ele.action === 'new' && parentId && this.isChildPage && ele.buttonEnabled != 'conditional') {
            ele.buttonEnabled = 'yes';
          }
        })
      }
	initSearchForm(){
  this.tableSearchFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.tableSearchConfig)
}
	actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof CustomlistpageBaseComponent, ' '> = methodName;
    if (btn.action === 'navigate_to_page' && btn.pageName?.url) {
      this.router.navigateByUrl(btn.pageName.url);
    }
    else if (typeof this[action] === "function") {
      this[action]();
    }
  }
	onSelect(event: any, field: string, config: any,index?:number) { 
    field = field.replace('?.','_');
    if(index != undefined && index >=0)
    field = `${field}_${index}`
    let lookupFields: any[] = config?.lookupFields || [];
    let model = {
      id: event.sid,
      value: {}
    }
    if (lookupFields.length > 0) {
      model.value = lookupFields?.reduce((o: any, key: any) => ({ ...o, [key]: event[key] }), {});
    }
    else {
      model.value = event;
    }
    if (!this.selectedItems?.hasOwnProperty(field)) {
      this.selectedItems[field] = [];
    }
    if (config?.multiple === true) {
      this.selectedItems[field]?.push(model);
    }
    else {
      this.selectedItems[field][0] = model;
    }
  }
	onKeydown(event: any) {
  if (event.which === 13 || event.keyCode === 13) {
    // this.filter.globalSearch = this.globalSearch
   this.onRefresh();
  }
}
	formatFilteredData(data:any,fieldName:string){
    return data;
  }
	clearFilterValues() {
  this.tableSearchControls.reset();
  this.filter.advancedSearch = {};
  this.onRefresh();
  this.filtersApplied = false;
}
	toggleAdvancedSearch() {
  this.showAdvancedSearch = !this.showAdvancedSearch;
}
	initFilterForm(){
    this.quickFilterFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.quickFilterConfig);
    this.filterSearch();
}
	advancedSearch() {
    this.filter.advancedSearch = this.tableSearchControls.value;
    let hasDates = this.tableSearchConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "date" || e.fieldType.toLowerCase() == "datetime");
    if (hasDates.length > 0) {
      hasDates.forEach((f: any) => {
        let field = f.name;
        let value = this.filter.advancedSearch[field];
        if (value && Array.isArray(value)) {
          let val = { lLimit: value[0].getTime(), uLimit: value[1] ? value[1].getTime() : value[1], type: "Date" }
          this.filter.advancedSearch[field] = val;
          if (value[0] == null && value[1] == null) {
            delete this.filter.advancedSearch[field];
          }
        }
      });
    }
    let hasNumbers = this.tableSearchConfig.children.filter((e: any) => e.fieldType.toLowerCase() == "number" || e.fieldType.toLowerCase() == "double");
    if (hasNumbers.length > 0) {
      hasNumbers.forEach((f: any) => {
        let field = f.name;
        let value = this.filter.advancedSearch[field];
        if (value && !Array.isArray(value)) {
          this.filter.advancedSearch[field] = {
            lLimit: value.min, uLimit: value.max, type: "Number"
          }
          if (value.min == null && value.max == null) {
            delete this.filter.advancedSearch[field];
          }
        }
      });
    }
    this.onRefresh();
    this.toggleAdvancedSearch();
    this.filtersApplied = true;
  }
	calculateFormula(){
	
}
	loadGridData() {
    let gridSubscription: any;
    if (environment.prototype) {
      gridSubscription = this.employeesService.getProtoTypingData().subscribe((data: any) => {
        this.gridData = [...this.gridData, ...data];
        this.isPageLoading = false;
      });
    }
    else {
      this.gridData = []
    }
}
	onDelete() {
    if (this.selectedValues.length > 0) {
      let requestedParams: any = { ids: this.selectedValues.toString() }
      this.confirmationService.confirm({
        message: this.translateService.instant('DELETE_CONFIRMATION_MESSAGE'),
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const deleteSubscription = this.employeesService.delete(requestedParams).subscribe((res: any) => {
            this.showToastMessage({ severity: 'success', summary: '', detail: this.translateService.instant('RECORDS_DELETED_SUCCESSFULLY') });
            requestedParams = {};
            this.selectedValues = [];
            this.onRefresh(true);

          });
          this.subscriptions.push(deleteSubscription);
        },
        reject: () => {
          
        },
      });
    }

  }
	clearGlobalSearch(){
  this.filter.globalSearch = '';
  this.onRefresh();
}

    onInit() {
		
		this.initSearchForm();

		this.initFilterForm();
		    this.initFilterForm();
    this.initSearchForm();
    this.tableConfig.children = this.appUtilBaseService.formatTableConfig(this.tableConfig.children);
    this.tableFieldConfig = this.appUtilBaseService.formatTableFieldConfig(this.tableConfig.children);
    this.loadGridData();
    this.disablechildAction();
    this.updateActions();
    this.gridConfig = this.getGridConfig();
    this.selectedColumns = this.gridConfig.columns;
    }
	
     onDestroy() {
		
		
        this.subscriptions.forEach((subs: { unsubscribe: () => void; }) => subs.unsubscribe());
    }
     onAfterViewInit() {
		
    }

}
