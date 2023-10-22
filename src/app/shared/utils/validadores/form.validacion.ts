import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function regularCharacterValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const stringValid = /[^A-Za-zá-úÁ-Ú\s\u00f1\u00d1]/.test(value);

        return stringValid ? {stringValid:true}: null;
    }
}

export function isNumberPositiveValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (value === null || value === undefined || value === '') {
        return null;
      }

      const parsedValue = Number(value);

      if (isNaN(parsedValue) || parsedValue <= 0) {
        return { isNumberPositive: true };
      }

      return null;
  }
}

