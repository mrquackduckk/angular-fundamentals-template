import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
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
      title: new FormControl('', [Validators.required]),
      description: new FormControl([], [Validators.required]),
      author: new FormControl('', [Validators.required]),
      authors: new FormControl([], [Validators.required]),
      duration: new FormControl(0, [Validators.required]),
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
