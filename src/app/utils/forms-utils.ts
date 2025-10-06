import { FormArray, FormControl, FormGroup, FormRecord, ValidationErrors } from "@angular/forms";

export class FormsUtils {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched);
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    return this.getErrorMessages(errors);
  }

  static isValidFlieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors &&
      formArray.controls[index].touched);
  }
  
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getErrorMessages(errors);
    
  }

  static getErrorMessages(errors: ValidationErrors): string | null{
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `minlength is ${errors['minlength'].requiredLength}`;
        case 'min':
          return `Min value is ${errors['min'].min}`;
      }
    }

    return null;
  }

  static isValidControl(control: FormControl): boolean | null {
    return (
      control.errors &&
      control.touched);
  }

  static getControlError(control: FormControl): string | null {
    if (!control) return null;

    const errors = control.errors ?? {};
    return this.getErrorMessages(errors);
  }
  
}