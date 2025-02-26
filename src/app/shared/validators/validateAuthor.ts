import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateAuthor(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /[^A-Za-z\s]/;
    if (regex.test(value)) {
      return { invalidAuthor: 'Author name contains non-Latin letters or numbers' };
    }
    return null;
  };
}
