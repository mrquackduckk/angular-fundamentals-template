import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { validateAuthor } from '@app/shared/validators/validateAuthor';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  author = '';

  constructor(private fb: FormBuilder, library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [validateAuthor()]],  // Remove Validators.required
      authors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addNewAuthor(): void {
    if (!this.author.trim()) return;

    this.authors.push(this.fb.control(this.author, [validateAuthor()]));
    this.author = '';
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  getAuthors(): string[] {
    return this.authors.value;
  }
}
