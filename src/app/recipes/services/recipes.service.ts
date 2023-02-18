import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private readonly apiService: ApiService) { }
  getRecipes() {
    return this.apiService.getRecipes()
  }
}
