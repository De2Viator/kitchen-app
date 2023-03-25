import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: '../templates/recipe-details.component.html',
  styleUrls: ['../styles/recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    public readonly recipeService: RecipesService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const {id} = data;
      if (id) {
        this.recipeService.getRecipe(id).subscribe(recipe => {
          if(recipe) this.recipeService.recipe.next({...recipe, id})
          else this.router.navigate(['/recipes'])
        })
      }
    });
  }

  async deleteRecipe() {
    await this.router.navigate(['/recipes'])
    await this.recipeService.deleteRecipe()
  }

}
