import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecipe } from 'src/app/shared/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor( private recipeService:RecipeService ) {}
  recipes:IRecipe[] = [];
  newRecipe:Subscription = this.recipeService.addedRecipe.subscribe((data:any) => {
    this.recipes = this.recipeService.getRecipes()
  })

  ngOnInit() :void {
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.newRecipe.unsubscribe();
  }
}
