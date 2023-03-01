import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: '../templates/recipe-details.component.html',
  styleUrls: ['../styles/recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly recipeService: RecipesService
  ) {}
  recipe = {} as Recipe;
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const {id} = data;
      this.recipeService.getRecipe(id).subscribe((recipe) => {
        this.recipe = {...recipe, id};
        console.log(this.recipe)
      });
    });
  }
}
