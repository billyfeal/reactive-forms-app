import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formsUtils = FormsUtils;

  myForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.pattern(this.formsUtils.namePattern)]],
    email: [null, [Validators.required, Validators.pattern(this.formsUtils.emailPattern)]],
    username: [null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.formsUtils.notOnlySpacesPattern)]],
    psw: [null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.formsUtils.notOnlySpacesPattern)
    ]],
    psw2: [null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.formsUtils.notOnlySpacesPattern)
    ]]
  });

  onSubmit(){
   if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({ favoriteGames: [] });
  }


}
