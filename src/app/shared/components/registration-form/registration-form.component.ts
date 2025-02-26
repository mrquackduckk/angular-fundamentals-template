import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.

  ngOnInit(): void {
   this.registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, this.validateEmail]),
    password: new FormControl('', [Validators.required]),
   });
  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      if (!value) return null;

      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) ? null : { invalidEmail: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
