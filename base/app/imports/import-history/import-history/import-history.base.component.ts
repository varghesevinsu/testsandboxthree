import { ImportHistoryService } from '../import-history.service';
import { ImportHistoryBase} from '../import-history.base.model';
import { Directive, EventEmitter, Input, Output, SecurityContext, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppUtilBaseService } from '@baseapp/app-util.base.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeLogsComponent } from '@baseapp/widgets/change-logs/change-logs.component'
import { ImportHistoryApiConstants } from '../import-history.api-constants'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { allowedValuesValidator } from '@baseapp/widgets/validators/allowedValuesValidator';
import { fromEvent, Subscription, map } from 'rxjs';
import { environment } from '@env/environment';
import { Filter } from '@baseapp/vs-models/filter.model';
import { AppConstants } from '@app/app-constants';
import { AppGlobalService } from '@baseapp/app-global.service';
import { GridComponent } from '@baseapp/widgets/grid/grid.component';
import { ImportsService } from '@baseapp/imports/imports.service';
// @Component({
//   selector: 'app-import-history-page',
//   templateUrl: './import-history.component.html',
//   styleUrls: ['./_import-history.component.scss']
// })

@Directive(
  {
    // providers:[MessageService, ConfirmationService, DialogService]
  }
  )

export class ImportHistoryBaseComponent{
  errId: any;
	quickFilter: any;
  hiddenFields:any = {};
  quickFilterFieldConfig:any={}
	// bsModalRef?: BsModalRef;
	isSearchFocused:boolean = false;
  showBreadcrumb = AppConstants.showBreadcrumb;
	
showAdvancedSearch: boolean = false;
detPopupOpen : boolean = false;

tableSearchFieldConfig:any = {};
@ViewChild('toggleButton')
  toggleButton!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
  filter: Filter = {
    globalSearch: '',
    advancedSearch: {},
    sortField: null,
    sortOrder: null,
    quickFilter: {}
  };
params: any;
isMobile: boolean = AppConstants.isMobile;
displayErrorDet: boolean = false;
displayImport: boolean = false;
popupOpen : boolean = false;

  
gridData: ImportHistoryBase[] = [];
totalRecords: number = 0;
subscriptions: Subscription[] = [];
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
localStorageStateKey = "import-history";
showMenu: boolean = false;
conditionalActions:any ={
  disableActions:[],
  hideActions:[]
}
actionBarConfig:any =[];
updatedRecords:ImportHistoryBase[] = [];
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
	isChildPage:boolean = false;

	
	leftActionBarConfig : any = {
  "children" : [ {
    "visibility" : "show",
    "buttonStyle" : "curved",
    "label" : "Add Imports",
    "buttonType" : "icon_on_left",
    "showOn" : "both",
    "icon" : {
      "type" : "icon",
      "icon" : {
        "label" : "fa fa-download",
        "value" : "fa fa-download"
      },
      "iconColor" : "#000000",
      "iconSize" : "13px"
    },
    "type" : "button",
    "outline" : true,
    "valueChange" : true,
    "buttonEnabled" : "yes",
    "action" : "import"
  }, 
   {
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
  } ]
}
	rightActionBarConfig : any = { }
	tableSearchConfig : any = {
  "children" : [ {
    "label" : "TABLE_NAME",
    "data" : "",
    "field" : "modelName",
    "type" : "searchField",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "modelName",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "modelName",
    "fieldName" : "modelName"
  },{
    "label" : "TEMPLATE_NAME",
    "data" : "",
    "field" : "templateName",
    "type" : "searchField",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "templateName",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "templateName",
    "fieldName" : "templateName"
  }, {
    "label" : "INITIATED_TIME",
    "data" : "",
    "field" : "createdDate",
    "type" : "searchField",
    "fieldType" : "Date",
    "fieldId" : "createdDate",
    "timeOnly" : false,
    "uiType" : "datetime",
    "name" : "createdDate",
    "fieldName" : "createdDate"
  }, {
    "label" : "INITIATED_BY",
    "data" : "",
    "field" : "createdBy",
    "type" : "searchField",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "createdBy",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "createdBy",
    "fieldName" : "createdBy"
  }, {
    "label" : "STATUS",
    "data" : "",
    "field" : "importStatus",
    "type" : "searchField",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "importStatus",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "importStatus",
    "fieldName" : "importStatus"
  } ],
  "columns" : "2",
  "type" : "tableSearch",
  "showAdvancedSearch" : true
}
	quickFilterConfig : any = { }
	customRenderConfig : any = {
  "children" : [
    {
      "fieldName":"importErrorDetails",
    render:(data: any, type: any, row: any, meta: any) => {return this.customErrDetField(data,row);}
    },
    {
      "fieldName":"importStatus",
    render:(data: any, type: any, row: any, meta: any) => {return this.customStatusField(data,row);}
    },
    {
      "fieldName":"attachmentId",
    render:(data: any, type: any, row: any, meta: any) => {return this.getUploadedUrl(data,row);}
    }
     ]
}
tableConfig : any = {
  "recordSelection" : "none",
  "striped" : true,
  "rightFreezeFromColumn" : "0",
  "viewAs" : "list",
  "hoverStyle" : "box",
  "tableStyle" : "style_2",
  "type" : "grid",
  "showDetailPageAs" : "navigate_to_new_page",
  "leftFreezeUptoColumn" : "2",
  "pageLimit" : "50",
  "children" : [ {
    "label" : "TABLE_NAME",
    "data" : "",
    "field" : "modelName",
    "type" : "gridColumn",
    "width" : "150px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "modelName",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "modelName",
    "fieldName" : "modelName"
  },{
    "label" : "TEMPLATE_NAME",
    "data" : "",
    "field" : "templateName",
    "type" : "gridColumn",
    "width" : "150px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "templateName",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "templateName",
    "fieldName" : "templateName"
  },  
  {
    "label" : "STATUS",
    "data" : "",
    "field" : "importStatus",
    "type" : "gridColumn",
    "width" : "220px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "importStatus",
    "timeOnly" : false,
    "uiType" : "select",
    "name" : "importStatus",
    "fieldName" : "importStatus",

    "allowedValues" : {
      "values" : [ {
        "label" : "INITIATED",
        "value" : "INITIATED"
      }, {
        "label" : "INVALID_TEMPLATE",
        "value" : "INVALID_TEMPLATE"
      }, {
        "label" : "TERMINATED_WITH_ERRORS",
        "value" : "TERMINATED_WITH_ERRORS"
      },
      {
        "label" : "IMPORT_COMPLETED_WITH_ERRORS",
        "value" : "IMPORT_COMPLETED_WITH_ERRORS"
      }, {
        "label" : "IMPORT_COMPLETED",
        "value" : "IMPORT_COMPLETED"
      }, {
        "label" : "IMPORT_FAILED",
        "value" : "IMPORT_FAILED"
      },
      {
        "label" : "FILE_UPLOADED",
        "value" : "FILE_UPLOADED"
      }, {
        "label" : "VALIDATION_TASK_CREATED",
        "value" : "VALIDATION_TASK_CREATED"
      }, {
        "label" : "VALIDATION_IS_IN_PROGRESS",
        "value" : "VALIDATION_IS_IN_PROGRESS"
      },
      {
        "label" : "TEMPLATE_VALIDATED",
        "value" : "TEMPLATE_VALIDATED"
      }, {
        "label" : "IMPORT_ACTIVITY_CREATED",
        "value" : "IMPORT_ACTIVITY_CREATED"
      }, {
        "label" : "IMPORT_IN_PROGRESS",
        "value" : "IMPORT_IN_PROGRESS"
      }, {
        "label" : "ALL_WRITERS_COMPLETED",
        "value" : "ALL_WRITERS_COMPLETED"
      }  ],
      "conditions" : {
        "conditionType" : "Auto",
        "conditions" : [ 
          {
          "id" : "INITIATED",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "Initiated"
            } ]
          }
        }, {
          "id" : "INVALID_TEMPLATE",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "Invalid Template"
            } ]
          }
          
        }, 
        {
          "id" : "TERMINATED_WITH_ERRORS",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "Terminated With Errors"
            } ]
          }
       
        },
        {
          "id" : "IMPORT_COMPLETED_WITH_ERRORS",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "Import Completed With Errors"
            } ]
          }
        },
        {
          "id" : "IMPORT_COMPLETED",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "Import Complete"
            } ]
          }
        },
        {
          "id" : "IMPORT_FAILED",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "Import Failed"
            } ]
          }
        }, 
        {
          "id" : "IN_PROGRESS",
          "query" : {
            "condition" : "and",
            "rules" : [ {
              "field" : "dropdown1",
              "operator" : "==",
              "value" : "In Progress"
            } ]
          }
        }]
      }
    },
  },{
    "label" : "NUMBER_OF_RECORDS_IMPORTED",
    "data" : "",
    "field" : "noOfRecordsProcessed",
    "type" : "gridColumn",
    "width" : "220px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "number",
    "fieldId" : "noOfRecordsProcessed",
    "timeOnly" : false,
    "uiType" : "number",
    "name" : "noOfRecordsProcessed",
    "fieldName" : "noOfRecordsProcessed"
  }, {
    "label" : "SUCESSFULLY_IMPORTED_RECORDS",
    "data" : "Sucessfully imported records",
    "width" : "220px",
    "showOnMobile" : "true",
    "showLabel" : false,
    "labelPosition" : "top",
    "field" : "succeedRecords",
    "fieldType" : "number",
    "fieldId" : "succeedRecords",
    "timeOnly" : false,
    "uiType" : "number",
    "name" : "succeedRecords",
    "type" : "gridColumn",
    "fieldName" : "succeedRecords"
  }, {
    "label" : "ERROR_RECORDS",
    "data" : "Error Records",
    "width" : "120px",
    "showOnMobile" : "true",
    "showLabel" : false,
    "labelPosition" : "top",
    "field" : "failedRecords",
    "fieldType" : "number",
    "fieldId" : "failedRecords",
    "timeOnly" : false,
    "uiType" : "number",
    "name" : "failedRecords",
    "type" : "gridColumn",
    "fieldName" : "failedRecords",
  }, {
    "label" : "ERROR_DETAILS",
    "data" : "Import Error Details",
    "width" : "120px",
    "showOnMobile" : "true",
    "showLabel" : false,
    "labelPosition" : "top",
    "field" : "importErrorDetails",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "importErrorDetails",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "importErrorDetails",
    "type" : "gridColumn",
    "skipSanitize" : true,
    "fieldName" : "importErrorDetails"
  },  {
    "label" : "INITIATED_TIME",
    "data" : "",
    "field" : "createdDate",
    "type" : "gridColumn",
    "width" : "140px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "Date",
    "fieldId" : "createdDate",
    "timeOnly" : false,
    "uiType" : "datetime",
    "name" : "createdDate",
    "fieldName" : "createdDate"
  }, {
    "label" : "INITIATED_BY",
    "data" : "",
    "field" : "createdBy",
    "type" : "gridColumn",
    "width" : "120px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "createdBy",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "createdBy",
    "fieldName" : "createdBy"
  }, {
    "label" : "COMPLETED_TIME",
    "data" : "",
    "field" : "completedTime",
    "type" : "gridColumn",
    "width" : "140px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "Date",
    "fieldId" : "completedTime",
    "timeOnly" : false,
    "uiType" : "datetime",
    "name" : "completedTime",
    "fieldName" : "completedTime"
  }, {
    "label" : "UPLOADED_FILE",
    "data" : "",
    "field" : "attachmentId",
    "type" : "gridColumn",
    "width" : "120px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "url", 
    "multipleValues" : false,
    "fieldId" : "attachmentId",
    "timeOnly" : false,
    "uiType" : "attachments",
    "name" : "attachmentId",
    "fieldName" : "attachmentId"
  }, {
    "label" : "SOURCE_FILE_TYPE",
    "data" : "",
    "field" : "fileType",
    "type" : "gridColumn",
    "width" : "130px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "fileType",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "fileType",
    "fieldName" : "fileType"
  }, {
    "label" : "INPUT_DATE_FORMAT",
    "data" : "",
    "field" : "dateFormat",
    "type" : "gridColumn",
    "width" : "145px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "dateFormat",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "dateFormat",
    "fieldName" : "dateFormat"
  }, {
    "label" : "INPUT_NUMBER_FORMAT",
    "data" : "",
    "field" : "numberFormat",
    "type" : "gridColumn",
    "width" : "150px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "numberFormat",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "numberFormat",
    "fieldName" : "numberFormat"
  },
  {
    "label" : "DATE_TIME_FORMAT",
    "data" : "",
    "field" : "dateTimeFormat",
    "type" : "gridColumn",
    "width" : "145px",
    "showOnMobile" : "true",
    "labelPosition" : "top",
    "fieldType" : "string",
    "multipleValues" : false,
    "fieldId" : "dateTimeFormat",
    "timeOnly" : false,
    "uiType" : "text",
    "name" : "dateTimeFormat",
    "fieldName" : "dateTimeFormat"
  } ],
  "sorting" : "single_column",
  "sortField" : "createdDate",
  "sortOrder" : "desc",
  "showSettingsIcon" : "false",
  "detailPageNavigation" : "click_of_the_row",
  "rowSpacing" : "medium",
  "rowHeight" : "medium"
}
	pageViewTitle: string = 'IMPORTS';
	
		tableSearchControls : UntypedFormGroup = new UntypedFormGroup({
	createdBy: new UntypedFormControl('',[]),
	createdDate: new UntypedFormControl('',[]),
	importStatus: new UntypedFormControl('',[]),
	attachmentId: new UntypedFormControl('',[]),
	completedTime: new UntypedFormControl('',[]),
	batchSize: new UntypedFormGroup({ min: new UntypedFormControl(null, []), max: new UntypedFormControl(null, []) }),
	fileType: new UntypedFormControl('',[]),
	templateName: new UntypedFormControl('',[]),
	modelName: new UntypedFormControl('',[]),
	dateFormat: new UntypedFormControl('',[]),
	numberFormat: new UntypedFormControl('',[]),
});

		quickFilterControls : UntypedFormGroup = new UntypedFormGroup({
});

	public importsService = inject(ImportsService);
	public importHistoryService = inject(ImportHistoryService);
public appUtilBaseService = inject(AppUtilBaseService);
public translateService = inject(TranslateService);
public messageService = inject(MessageService);
public confirmationService = inject(ConfirmationService);
public dialogService = inject(DialogService);
public domSanitizer = inject(DomSanitizer);
// public bsModalService = inject(BsModalService);
public activatedRoute = inject(ActivatedRoute);
public renderer2 = inject(Renderer2);
public router = inject(Router);
public appGlobalService = inject(AppGlobalService);
	

	
	getDisabled(formControl: FormGroup, ele: string) {
  const parent = ele.split('?.')[0];
  if (formControl.controls[parent] instanceof FormGroup){
    return formControl.get(ele)?.disabled
  }
  else
    return formControl.controls[parent].disabled;
} 
customErrDetField(data:any,row:any){
  const customMsg = "Show Error"
  return this.appUtilBaseService.domSanitizer.sanitize(SecurityContext.HTML, customMsg);
}
customStatusField(data:any,row:any ){
  let conditionalTemplate: any = '';
  const arrVars = ["FILE_UPLOADED","VALIDATION_TASK_CREATED","VALIDATION_IS_IN_PROGRESS","TEMPLATE_VALIDATED","IMPORT_ACTIVITY_CREATED","IMPORT_IN_PROGRESS","ALL_WRITERS_COMPLETED"]
  let customStatus = this.translateService.instant(data);
  if(arrVars.includes(data)){
    data = "IN_PROGRESS";
    customStatus = this.translateService.instant("IN_PROGRESS");
  }
  let colorConfig = this.tableFieldConfig["importStatus"].conditionalStyling[data]
  conditionalTemplate = conditionalTemplate + `<span class="conditional conditional-container ellipsis white-space-nowrap ${data}" >
  <span align="center" style="display:block;">
  ${customStatus}</span>
     </span>`;
  return conditionalTemplate;
}


getUploadedUrl(data:any,row:any){
  let template = '';
  
    template = template + `<span>
  <a target='_blank' href="${AppConstants.attachmentBaseURL}${data}" class="ellipsis white-space-nowrap">${this.appUtilBaseService.domSanitizer.sanitize(SecurityContext.HTML, "uploaded Link")}</a>
  </span>`

  return template;
}
onImport(){
  this.displayImport =true
  this.popupOpen = true
}
onClose(){
  this.displayImport =false;
  this.popupOpen = false;
}
onImportSucess(){
  this.displayImport =false;
  this.popupOpen = false;
  this.onRefresh();
}
onDetailClosed(){
  this.detPopupOpen = false;
  this.onInit();
}
	loadGridData() {
    let gridSubscription: any;
    if (environment.prototype) {
      gridSubscription = this.importHistoryService.getProtoTypingData().subscribe((data: any) => {
        this.gridData = [...this.gridData, ...data];
        this.isPageLoading = false;
      });
    }
    else {
      this.gridData = []
    }
}
	clearFilterValues() {
  this.tableSearchControls.reset();
  this.filter.advancedSearch = {};
  this.onRefresh();
}
	onRefresh(): void {
    const params = this.assignTableParams();
    this.gridComponent.refreshGrid(params);
  }
	onRowClickEvent(id: any,event?:any) {
    if (event.target.classList[0] =='importErrorDetails')
    {
      this.detPopupOpen = true;
      this.displayErrorDet = true
      this.errId=id;
    }
}
	toggleAdvancedSearch() {
  this.showAdvancedSearch = !this.showAdvancedSearch;
}
	clearAllFilters() {
  this.filter.globalSearch = '';
  this.clearFilterValues();
}
	initFilterForm(){
    this.quickFilterFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.quickFilterConfig);
    this.filterSearch();
}
	actionBarAction(btn: any) {
    const methodName: any = (`on` + btn.action.charAt(0).toUpperCase() + btn.action.slice(1));
    let action: Exclude<keyof ImportHistoryBaseComponent, ' '> = methodName;
    if (btn.action === 'navigate_to_page' && btn.pageName?.url) {
      this.router.navigateByUrl(btn.pageName.url);
    }
    else if (typeof this[action] === "function") {
      this[action]();
    }
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
  }

clearFilters(){
  this.filter.globalSearch = '';
  this.isSearchFocused = false;
}

focus(){
  this.isSearchFocused = !this.isSearchFocused;
}
	initSearchForm(){
  this.tableSearchFieldConfig= this.appUtilBaseService.getControlsFromFormConfig(this.tableSearchConfig)
}
	filterSearch() {
    this.quickFilterControls.valueChanges.subscribe((value) => {
      let dateRangeNotChoosen: boolean = false;
      for (let control of this.quickFilterConfig.children) {
        if (control.fieldType === 'Date') {
          if (value[control.field][0] && !value[control.field][1]) {
            dateRangeNotChoosen = true;
            break;
          }
        }
     else if (control.uiType === 'autosuggest' && AppConstants.isSql) {
              control.mapping?.map((o: any, index: number) => {
            if (o.isApplicable && !this.hiddenFields[o.childField] && value[control.fieldName] && value[control.fieldName][o.parentField]) {
              this.quickFilterControls.get([o.childField])?.patchValue(value[control.fieldName][o.parentField],{emitEvent:false});
            }
          })
        }
      }
      if (!dateRangeNotChoosen) {
        this.filter.quickFilter = value;
       this.onRefresh();
      }
    });
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
            if (actionConfig.visibility === 'conditional' && actionConfig.conditionForButtonVisiblity) {
                const conResult = this.appUtilBaseService.evaluvateCondition(actionConfig.conditionForButtonVisiblity?.query?.rules, actionConfig.conditionForButtonVisiblity?.query?.condition);
                this.validateActions(actionConfig.action, conResult, 'view');
            }
            if (actionConfig.buttonEnabled === 'conditional' && actionConfig.conditionForButtonEnable) {
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

  getGridConfig() {
    const self = this
    return {
      data: this.gridData,
      columns: this.getColumns(),
      ajaxUrl: ImportHistoryApiConstants.getDatatableData,
      select: false,
      colReorder: (String(this.tableConfig?.columnReorder)?.toLowerCase() === 'true'),
      detailPageNavigation: (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_of_the_row' ? 'row_click' : (this.tableConfig?.detailPageNavigation?.toLowerCase() == 'click_on_navigate_icon' ? 'row_edit' : '')),
      toggleColumns: (String(this.tableConfig?.toggleColumns)?.toLowerCase() === 'true'),
      paging: false,
      scrollX: true,
      showSettingsIcon: false,
      scrollCollapse: true,
      pageLength: parseInt(String(this.tableConfig?.pageLimit)),
      deferRender: true,
      ordering: true,
      sortField: this.tableConfig.sortField,
      sortOrder: this.tableConfig.sortOrder,
      colResize: (String(this.tableConfig?.columnResize)?.toLowerCase() === 'true'),
      disableSelection: (this.tableConfig?.recordSelection?.toLowerCase() == 'none' ? true : false),
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
      parentId: false,
      uniqueIdentifier:this.tableConfig?.uniqueIdentifier|| null,
      onRowClick: (event: any, id: string) => {
        this.onRowClickEvent(id, event);

      },
    };

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

	onKeydown(event: any) {
  if (event.which === 13 || event.keyCode === 13) {
    // this.filter.globalSearch = this.globalSearch
   this.onRefresh();
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
    // this.disablechildAction();
    this.updateActions();
    this.gridConfig = this.getGridConfig();
    }
	
     onDestroy() {
		
		
        this.subscriptions.forEach((subs: { unsubscribe: () => void; }) => subs.unsubscribe());
    }
     onAfterViewInit() {
		
    }

}
