import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { IIngridient } from '../shared/ingridient';
import { IRecipe } from '../shared/recipe';
import { ShoppingService } from '../shopping/shopping.service';

@Injectable()
export class RecipeService {
  constructor (private shoppingService:ShoppingService, private api:ApiService){}
  recipes:IRecipe[] = this.getRecipes();
  addedRecipe = new Subject();

  getRecipe(id:string) {
    let recipeSelect = {} as IRecipe;
    this.recipes.forEach(recipe => {
      if(recipe.id === id) {
        recipeSelect = recipe;
      }
    });
    return recipeSelect;
  }

  getRecipes(){
    let recipes:IRecipe[] = []
     this.api.getRecipes().subscribe((data:any) => {
      recipes.push(...data);
    });
    return recipes;
  }

  editRecipe(changedRecipe:IRecipe){
    this.api.changeRecipe(changedRecipe).subscribe(data => {
      this.recipes = this.getRecipes();
      this.addedRecipe.next(this.recipes);
    });

  }

  addRecipe(recipe:IRecipe){
    let recipes:IRecipe[] = []
    this.api.addRecipe(recipe).subscribe(data => {
      this.recipes = this.getRecipes();
      this.addedRecipe.next(this.recipes);
    });
   
  }

  deleteRecipe(id:string) {
    this.api.deleteRecipe(id).subscribe(data => {
      this.recipes = this.getRecipes();
      this.addedRecipe.next(this.recipes);
    });
  }

  shopIngridient(ingridients:IIngridient[]):void {
    this.shoppingService.shopIngridients(ingridients);
  }
}
