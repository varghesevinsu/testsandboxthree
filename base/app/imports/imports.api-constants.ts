

export class ImportsApiConstants {
    public static readonly create: any = {
        url: '/rest/rappitimports/',
        method: 'POST',
        showloading: true
    };
    public static readonly getErrorData: any = {
        url: '/rest/rappitimporterrors/datatable/{pid}',
        method: 'POST',
        showloading: true
    };
    public static readonly getDownloadurl: any = {
        url: '/rest/rappitimporttemplates/attachmentidbytype',
        method: 'POST',
        showloading: true
    };
    public static readonly update: any = {
        url: '/rest/rappitimports/',
        method: 'PUT',
        showloading: true
    };

}
