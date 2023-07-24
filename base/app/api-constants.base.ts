export class BaseApiConstants {
	public static isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;
	public static apihost = 'rest';
	public static readonly workFlowConfig: any = {
        url: "/rest/workflowconfig/getconfig/{workflowType}",
        method: "GET",
        showloading: true
    };  
    public static readonly getChangelog: any = {
        url: '/rest/changelogs/datatable/{entityName}/{entityId}/{fieldName}/{fromModifiedDate}',
        method: 'POST',
        showloading: true
    };

    public static readonly uploadAttachment:any ={
        url:'/rest/attachments/upload',
        method:'POST',
        showloading:true
    }
    
    public static workflowHistory:any ={
        url:'/rest/workflowhistory/{workflowType}/{modelid}/datatable',
        method:'POST',
        showloading:false
    }
}
