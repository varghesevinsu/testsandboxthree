import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CustomValidators() {
    let allowedValuesValidator = function(values: string[],  isAllowed = true){
        return (control: AbstractControl): ValidationErrors | null => {
            const valuePresent = values.includes(control.value);
            const invalid = isAllowed ? !valuePresent : valuePresent;
            const errorKey = isAllowed ? 'allowedValues' : 'notAllowedValues';
            return invalid ? { [errorKey] : {value: control.value}} : null;
          };
    }
}

CustomValidators.prototype.allowedValuesValidator = function(values: string[],  isAllowed = true){
    return (control: AbstractControl): ValidationErrors | null => {
        const valuePresent = values.includes(control.value);
        const invalid = isAllowed ? !valuePresent : valuePresent;
        const errorKey = isAllowed ? 'allowedValues' : 'notAllowedValues';
        return invalid ? { [errorKey] : {value: control.value}} : null;
      };
}