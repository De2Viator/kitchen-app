import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipesService} from "../../services/recipes.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { EditedRecipe, Ingredient, UploadedRecipe} from "../../models/recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-recipe-upload',
  templateUrl: '../templates/recipe-upload.component.html',
  styleUrls: ['../styles/recipe-upload.component.scss']
})
export class RecipeUploadComponent implements OnInit, OnDestroy {
  constructor(public readonly recipeService: RecipesService, private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }
  recipeForm:FormGroup = new FormGroup({
    name:new FormControl(),
    description: new FormControl()
  });
  isEdit: boolean = false;
  addedImage = {} as File;
  recipeSubscription: Subscription = new Subscription();
  image: string | ArrayBuffer |null = null;
  ingredients = new FormArray<FormGroup<{name: FormControl<string | undefined>, amount: FormControl<number | undefined>}>>
  ([]);

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const {id} = data;
      if(id) {
        this.recipeService.getRecipe(id);
        this.isEdit = true;
        this.recipeSubscription = this.recipeService.recipe.subscribe((recipe) => {
          this.image = recipe.image
          this.initForms();
          if(recipe.ingredients) {
            this.ingredients.clear();
            for(const ingredient of recipe.ingredients) {
              this.addIngredient(ingredient.name, ingredient.amount)
            }
          }
        })
      } else {
        this.isEdit = false;
        this.initForms()
      }
    })
  }

  initForms() {
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipeService.recipe.value.name, {
        validators:[Validators.required, Validators.nullValidator],
        nonNullable: true,
      }),
      description: new FormControl(this.recipeService.recipe.value.description, {
        validators:[Validators.required, Validators.nullValidator],
        nonNullable: true,
      }),
    })
  }
  addIngredient(name?:string, amount?:number) {
    const form = new FormGroup({
      name: new FormControl(name, {
        validators:[Validators.required, Validators.nullValidator],
        nonNullable: true
      }),
      amount: new FormControl(amount, {
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
    reader.readAsDataURL(selectedFile);
    reader.onload = (event) => {
      this.image = event.target!.result
    }
  }

  async addRecipe() {
    if(this.recipeForm.valid && this.ingredients.valid && this.image) {
      const recipe: UploadedRecipe = {
        name: this.recipeForm.value.name as string,
        description: this.recipeForm.value.description as string,
        date: new Date().toISOString(),
        ingredients: this.ingredients.value as Ingredient[]||[],
      }

      if(this.isEdit) {
        const image = this.addedImage.name ? this.addedImage as File : this.image as string
        const editedRecipe: EditedRecipe = {...recipe, image}
        this.recipeService.updateRecipe(editedRecipe)
      } else {
        const addedRecipe = {...recipe, image: this.addedImage}
        const response = await this.recipeService.addRecipe(addedRecipe)
        response.subscribe(data => {
          this.router.navigate([`/recipes/${data.id}`])
        });
      }
    } else {
      throw new Error('Some data is wrong')
    }
  }

  ngOnDestroy() {
    this.recipeService.recipe.next({
      id:'',
      ingredients:[],
      image:'',
      date:new Date().toISOString(),
      description:'',
      name:''
    })
    this.recipeSubscription.unsubscribe()
  }
}
