import { inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/auth.service";
import { AppUtilBaseService } from "@baseapp/app-util.base.service";
import { MessageService } from "primeng/api";


export class ForgotPasswordComponentBase{
    form: FormGroup = new FormGroup({});
    formErrors:any = {};
    formControls = {
        email: new FormControl('',[Validators.required, Validators.email]),
    };

    
    public authService = inject(AuthService);
    public messageService = inject(MessageService);
    public appUtilService = inject(AppUtilBaseService);
    public router = inject(Router);
  
    onInit() {
        this.initForm();
    }

    initForm(){
        this.form = new FormGroup(this.formControls);
    }

    resetPassword(){
        const data = this.form.getRawValue();
        const errors: string[] = []
        if(this.appUtilService.isValidForm(this.form, this.formErrors, errors)){
            this.authService.recoverPassword(data).subscribe(
                res =>{
                    this.showMessage({severity:'success', summary:'', detail:'Record Saved Successfully'});
                },
                error =>{
                    this.showMessage({severity:'error', summary:'Error', detail:'Error'});
                }
            )

        }else{
            if(errors.length){
                this.showMessage({severity:'error', summary:'Error', detail:errors.join('<br> ')});
            }
        }
    }

    showMessage(config:any){
        this.messageService.clear();
        this.messageService.add(config);
    }

    loadLoginPage(){
        this.router.navigateByUrl('auth/login')
    }

}
