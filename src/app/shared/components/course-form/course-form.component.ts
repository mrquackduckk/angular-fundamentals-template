import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators
} from '@angular/forms';
import { validateAuthor } from '@app/shared/validators/validateAuthor';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  availableAuthors: string[] = ['Author 1', 'Author 2', 'Author 3']; // Example authors

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([], Validators.required),
      newAuthor: this.fb.group({
        authorName: ['', [Validators.minLength(2), validateAuthor()]]
      })
    });
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get newAuthorName() {
    return this.courseForm.get('newAuthor.authorName');
  }

  addAuthor(author: string) {
    const index = this.availableAuthors.indexOf(author);
    if (index !== -1) {
      this.availableAuthors.splice(index, 1);
      this.authors.push(this.fb.control(author));
    }
  }

  removeAuthor(index: number) {
    const author = this.authors.at(index).value;
    this.availableAuthors.push(author);
    this.authors.removeAt(index);
  }

  createAuthor() {
    const newAuthorName = this.newAuthorName?.value;
    if (newAuthorName && newAuthorName.length >= 2) {
      this.availableAuthors.push(newAuthorName);
      this.newAuthorName?.setValue('');
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
    }
  }
}