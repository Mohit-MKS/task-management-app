import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-error-message',
  template: ` <div *ngIf="errorMessage" class="invalid-feedback">
  {{ errorMessage }}
</div>`,
  styles: [
    ".invalid-feedback {display: block;}"
  ]
})
export class ErrorMessageComponent {

  @Input() control!: AbstractControl | null;

  get errorMessage(): any {
    try {
      const currentControl = this.control as FormControl;
      for (const propertyName in currentControl.errors) {
        if (
          currentControl.errors.hasOwnProperty(propertyName) &&
          currentControl.touched
        ) {
          return ValidatorService.getValidatorErrorMessage(
            propertyName,
            currentControl.errors[propertyName]
          );
        }
      }
    } catch (error) {
      return null;
    }
    return null;
  }

}
