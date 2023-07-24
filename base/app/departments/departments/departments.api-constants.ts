import { DepartmentsBase} from '@baseapp/departments/departments/departments.base.model';

export class DepartmentsApiConstants {
    public static readonly create: any = {
        url: '/rest/departments/',
        method: 'POST',
        showloading: true
    };
    public static readonly getById: any = {
        url: '/rest/departments/{sid}',
        method: 'GET',
        showloading: true
    };
    public static readonly delete: any = {
        url: '/rest/departments/{ids}',
        method: 'DELETE',
        showloading: true
    };
    public static readonly autoSuggestService: any = {
        url: '/rest/departments/autosuggest',
        method: 'GET',
        showloading: true
    };
    public static readonly update: any = {
        url: '/rest/departments/',
        method: 'PUT',
        showloading: true
    };
    public static readonly getDatatableData: any = {
        url: '/rest/departments/datatable',
        method: 'POST',
        showloading: true
    };
    public static readonly getByDepartmentCode: any = {
        url: '/rest/departments/bydepartmentcode/{departmentcode}',
        method: 'GET',
        showloading: true
    };
}