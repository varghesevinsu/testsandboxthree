import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateValidator(type:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let invalid = true;
        let errorKey = 'invalidDate';
        if(!control.value){
            invalid = false;
        }else{
            let day = control.value.getDay();
            switch (type) {
                case 'WeekDaysOnly':
                    invalid = [0,6].includes(day);
                    errorKey = 'weekDaysOnly';
                    break;
    
                case 'WeekEndsOnly':
                    invalid = ![0,6].includes(day);
                    errorKey = 'weekEndsOnly';
                    break;
                default:
                    break;
            }

        }


        return invalid ? { [errorKey] : {value: control.value}} : null;
    };
}