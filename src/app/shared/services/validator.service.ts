import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  static getValidatorErrorMessage(
    validatorName: string,
    validatorValue?: any
  ): any {
    const config: {
      [key: string]: string;
    } = {
      required: 'Required',
      email: 'Invalid email address',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      passwordmismatch: 'Password and Confirm password should match',
    };

    return config[validatorName];
  }


  static matchFieldValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control.parent;
      if (!formGroup || !formGroup.get(fieldName)) {
        return null;
      }
      const matchingControl = formGroup.get(fieldName);
      if (control.value !== matchingControl.value) {
        return { 'passwordmismatch': true };
      }

      return null;
    };
  }

  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
        return { confirmPasswordMatch: true };
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
