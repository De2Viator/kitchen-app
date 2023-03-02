import { Component } from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { Ingredient, UploadedRecipe} from "../../models/recipe";
import {Router} from "@angular/router";


@Component({
  selector: 'app-recipe-upload',
  templateUrl: '../templates/recipe-upload.component.html',
  styleUrls: ['../styles/recipe-upload.component.scss']
})
export class RecipeUploadComponent {
  constructor(private readonly recipeService: RecipesService, private readonly router: Router) {
  }
  addedImage = {} as File;
  image: string | null = null;
  recipeForm = new FormGroup({
    name: new FormControl('', {
      validators:[Validators.required, Validators.nullValidator],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators:[Validators.required, Validators.nullValidator],
      nonNullable: true,
    }),
  })
  ingredients = new FormArray<FormGroup<{name: FormControl<string>, amount: FormControl<number>}>>([]);
  addIngredient() {
    const form = new FormGroup({
      name: new FormControl('', {
        validators:[Validators.required, Validators.nullValidator],
        nonNullable: true
      }),
      amount: new FormControl(0, {
        validators:[Validators.required, Validators.nullValidator],
        nonNullable: true
      })
    })
    this.ingredients.push(form);
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i)
  }
  uploadImage(event: Event) {
    const el = event.target as HTMLInputElement;
    const selectedFile = el.files![0];
    const reader = new FileReader();
    this.addedImage = selectedFile;
    reader.onload = () => {
      //this.addedImage.image = e.target!.result as string | ArrayBuffer;
    }
  }

  addRecipe() {
    if(this.recipeForm.valid && this.ingredients.valid && this.addedImage.name) {
      const recipe: UploadedRecipe = {
        image: this.addedImage,
        name: this.recipeForm.value.name as string,
        description: this.recipeForm.value.description as string,
        date: new Date().toISOString(),
        ingredients: this.ingredients.value as Ingredient[]
      }
      this.recipeService.addRecipe(recipe).subscribe(data => {
        this.router.navigate([`/recipes/${data.id}`])
      });
    } else {
      throw new Error('Some data is wrong')
    }
  }
}
