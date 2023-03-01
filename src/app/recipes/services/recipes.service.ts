import { Injectable } from '@angular/core';
import {finalize, map} from 'rxjs';
import { ApiService } from '../../api.service';
import {Recipe, UploadedRecipe} from '../models/recipe';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[] = []
  constructor(private readonly apiService: ApiService, private fst: AngularFireStorage) { }
  getRecipes() {
    return this.apiService.getRecipes().pipe(map(data => {
      const results = []
      for(const key in data) {
        results.push({...data[key], id: key})
      }
      return results
    })).subscribe((data) => {
      this.recipes = data;
    });
  }

  getRecipe(id: string) {
    return this.apiService.getRecipe(id)
  }

  updateRecipe(id: string) {
    return this.apiService.getRecipe(id)
  }

  addRecipe(recipe: UploadedRecipe) {
    const response = this.apiService.addRecipeImage(recipe.image);
    const storageRef = this.fst.ref(`${this.apiService.basePath}/${recipe.image.name}`);
    return response.pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(async downloadURL => {
          (await this.apiService.addRecipeInfo(recipe, downloadURL)).subscribe(data => {
            const recipe = data[data.length - 1] as Recipe;
            if(!recipe.ingredients) recipe.ingredients = [];
            this.recipes.push(recipe);
          });
          return downloadURL;
        });
      })
    ).subscribe(() => {})
  }
}
