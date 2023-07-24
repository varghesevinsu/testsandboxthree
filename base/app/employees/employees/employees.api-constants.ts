import { EmployeesBase} from '@baseapp/employees/employees/employees.base.model';

export class EmployeesApiConstants {
    public static readonly getById: any = {
        url: '/rest/employees/{sid}',
        method: 'GET',
        showloading: true
    };
    public static readonly employeewfApprove: any = {
        url: '/rest/employees/employeewf/approve/{id}',
        method: 'PUT',
        showloading: true
    };
    public static readonly delete: any = {
        url: '/rest/employees/{ids}',
        method: 'DELETE',
        showloading: true
    };
    public static readonly update: any = {
        url: '/rest/employees/',
        method: 'PUT',
        showloading: true
    };
    public static readonly autoSuggestService: any = {
        url: '/rest/employees/autosuggest',
        method: 'GET',
        showloading: true
    };
    public static readonly create: any = {
        url: '/rest/employees/',
        method: 'POST',
        showloading: true
    };
    public static readonly employeewfSubmit: any = {
        url: '/rest/employees/employeewf/submit/{id}',
        method: 'PUT',
        showloading: true
    };
    public static readonly employeewfReject: any = {
        url: '/rest/employees/employeewf/reject/{id}',
        method: 'PUT',
        showloading: true
    };
    public static readonly getDatatableData: any = {
        url: '/rest/employees/datatable',
        method: 'POST',
        showloading: true
    };
}