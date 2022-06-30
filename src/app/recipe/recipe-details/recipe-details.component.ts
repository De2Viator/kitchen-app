import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from 'src/app/shared/types/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  id: string = '';
  recipe = {} as IRecipe;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(this.id);
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  shopIngridient(): void {
    this.recipeService.shopIngridient(this.recipe.ingridients);
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/']);
  }
}
