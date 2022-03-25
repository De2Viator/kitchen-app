import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from 'src/app/shared/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('recipeName') nameEl!: ElementRef;
  @ViewChild('recipeDesc') descEl!: ElementRef;

  id: string = '';
  editMode: boolean = false;
  recipe = {} as IRecipe;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
      this.recipe = this.recipeService.getRecipe(this.id);
      this.initForm();
    });
  }

  private initForm(): void {
    let recipeName = null;
    let recipeDescriprion = null;
    let recipeImage = null;
    let recipeIngridients: AbstractControl[] = [];

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeDescriprion = this.recipe.description;
      recipeImage = this.recipe.image;
      if (this.recipe['ingridients']) {
        for (const ingridient of this.recipe.ingridients) {
          recipeIngridients.push(
            new FormGroup({
              name: new FormControl(ingridient.name, Validators.required),
              amount: new FormControl(ingridient.amount, [
                Validators.required,
                Validators.pattern(/^\d+$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescriprion, Validators.required),
      image: new FormControl(recipeImage, Validators.required),
      ingridients: new FormArray(recipeIngridients),
    });
  }

  getIngridients() {
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }

  addIngridients(): void {
    const forms = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
    });
    (<FormArray>this.recipeForm.get('ingridients')).push(forms);
  }

  deleteIngridient(index: number): void {
    (<FormArray>this.recipeForm.get('ingridients')).controls.splice(index, 1);
    this.recipeForm.get('ingridients')?.value.splice(index, 1);
  }

  removeIngridients(): void {
    (<FormArray>this.recipeForm.get('ingridients')).clear();
    this.recipeForm
      .get('ingridients')
      ?.value.splice(
        0,
        (<FormArray>this.recipeForm.get('ingridients')).controls.length
      );
  }

  backToRecipe(): void {
    this.router.navigate([
      `/recipes-list/${this.recipe.id}/${this.recipe.name}`,
    ]);
  }

  submitRecipe() {
    const recipe = {
      name: this.recipeForm.get('name')?.value,
      description: this.recipeForm.get('description')?.value,
      image: this.recipeForm.get('image')?.value,
      ingridients: this.recipeForm.get('ingridients')?.value,
      id: this.id,
    };

    if (this.editMode) {
      this.recipe = recipe;
      this.recipeService.editRecipe(recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
  }
}
