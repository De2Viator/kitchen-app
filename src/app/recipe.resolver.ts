import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ApiService } from './api.service';
import { IRecipe } from './shared/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<IRecipe> {
  constructor(private api:ApiService){}
  resolve(route: ActivatedRouteSnapshot): any {
    let id = route.params['id'];
    this.api.getRecipes().subscribe(data => {
      let recipe = data.find((recipe:IRecipe) => recipe.id === id);
      console.log(recipe)
      return recipe
    })
  }
}
