import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { IRecipe } from './shared/types/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<IRecipe[]> {
  constructor(private api:ApiService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe[]> {
    return this.api.getRecipes()
  }
}
