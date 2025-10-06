import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsUtils } from '../../../utils/forms-utils';

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);

  formUtil = FormsUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Need for Speed', Validators.required],
        ['GTA V', Validators.required],
      ],
      Validators.minLength(2)
    ),
  });

  newFavorite: FormControl = this.fb.control(
    '', [Validators.required, Validators.minLength(3)]
  );

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({ favoriteGames: [] });
  }

  onAddToFavorites(){
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(
        newGame,
        [Validators.required, Validators.minLength(3)]
      )
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number){
    this.favoriteGames.removeAt(index);
  }

 }
