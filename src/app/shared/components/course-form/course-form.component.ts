import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl, FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { validateAuthor } from '@app/shared/validators/validateAuthor';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [[], [Validators.required, this.validateDescription()]],
      author: ['', [Validators.minLength(2), validateAuthor()]],
      authors: [[], [Validators.required]],
      duration: [0, [Validators.required, Validators.min(0)]],
    })
  }

  newAuthorInput = '';

  courseForm!: FormGroup;

  // Custom validator for description based on title length
  validateDescription(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const title = this.courseForm.get('title')?.value;
      if (title && title.length < 2) {
        return { invalidDescription: 'Description is invalid when title is less than 2 characters.' };
      }
      return null; // Valid if title length is 2 or more
    };
  }

  addNewAuthor(): void {
    if (!this.newAuthorInput) return;

    const authors = this.courseForm.get('authors')?.value;
    authors.push(this.newAuthorInput);
    this.courseForm.get('authors')?.setValue(authors);

    this.newAuthorInput = '';
  }

  removeAuthor(author: string): void {
    const authors = this.courseForm.get('authors')?.value;
    const index = authors.indexOf(author);
    authors.splice(index, 1);
    this.courseForm.get('authors')?.setValue(authors);
  }

  getAuthors(): string[] {
    return this.courseForm.get('authors')?.value;
  }
}
