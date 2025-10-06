import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArgumentOutOfRangeError } from 'rxjs';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.1)]],
    amount: [0, [Validators.required, Validators.min(0)]]
  });

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   amount: new FormControl(0)
  // });

  isValidField(fieldName: string): boolean | null {
    return !! this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Min ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return `Min value is ${errors['min'].min}`;
      }
    }

    return null;
  }


 }
