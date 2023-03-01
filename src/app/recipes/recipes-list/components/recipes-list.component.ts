import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: '../templates/recipes-list.component.html',
  styleUrls: ['../styles/recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  constructor(public recipeService: RecipesService) {};
  ngOnInit(): void {
    this.recipeService.getRecipes();
  }
}
