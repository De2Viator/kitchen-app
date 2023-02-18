import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: '../templates/recipes-list.component.html',
  styleUrls: ['../styles/recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  constructor(private readonly recipeService: RecipesService) {};
  recipes: Recipe[] = [];
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      for(const key in data) {
        this.recipes.push(data[key])
      }
    });
  }
  
}
