import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  email: string = '';
  password: string = '';

  public onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("Form Submitted!");
    }
    else {
      console.log("Form is invalid");
    }
  }
}
