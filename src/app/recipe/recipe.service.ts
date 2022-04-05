import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { IIngridient } from '../shared/ingridient';
import { IRecipe } from '../shared/recipe';
import { ShoppingService } from '../shopping/shopping.service';

@Injectable()
export class RecipeService {
  constructor (private shoppingService:ShoppingService, private api:ApiService){}
  recipes:IRecipe[] = this.getRecipes()
  addedRecipe = new Subject();

  getRecipe(id:string) {
    let recipeSelect = {} as IRecipe;
    this.recipes.forEach(recipe => {
      if(recipe.id === id) {
        recipeSelect = recipe;
      }
    });
    console.log(recipeSelect)
    return recipeSelect;
  }

  getRecipes(){
    let recipes:IRecipe[] = []
     this.api.getRecipes()
     .pipe(tap(data => {
       this.recipes.push(...data)
     }))
     .subscribe((data:any) => {
      recipes.push(...data);
    });
    return recipes;
  }

  editRecipe(changedRecipe:IRecipe){
    this.recipes = this.getRecipes();
    this.api.changeRecipe(changedRecipe).subscribe(data => {
      this.addedRecipe.next(this.recipes);
    });
  }

  addRecipe(recipe:IRecipe){
    let recipes:IRecipe[] = []
    this.api.addRecipe(recipe).subscribe(data => {
      this.addedRecipe.next(this.recipes);
    });
   
  }

  deleteRecipe(id:string) {
    this.api.deleteRecipe(id).subscribe(data => {
      this.addedRecipe.next(this.recipes);
    });
  }

  shopIngridient(ingridients:IIngridient[]):void {
    this.shoppingService.shopIngridients(ingridients);
  }
}
