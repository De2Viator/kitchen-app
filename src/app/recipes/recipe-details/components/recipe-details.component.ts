import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: '../templates/recipe-details.component.html',
  styleUrls: ['../styles/recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private readonly route: ActivatedRoute,
    public readonly recipeService: RecipesService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const {id} = data;
      this.recipeService.getRecipe(id)
    });
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
  }
}
