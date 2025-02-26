import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
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
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  newAuthorInput = '';

  courseForm!: FormGroup;

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl([], [Validators.required, Validators.minLength(2)]),
      author: new FormControl('', [Validators.required, Validators.minLength(0), validateAuthor()]),
      authors: new FormControl([], [Validators.required]),
      duration: new FormControl(0, [Validators.required, Validators.min(0)]),
    })
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
