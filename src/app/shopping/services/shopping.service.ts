import { Injectable } from '@angular/core';
import {Ingredient} from "../../recipes/models/recipe";
import {ApiService} from "../../api.service";
import {ShoppedIngredient} from "../models/shopped";
import {BehaviorSubject, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  constructor(private readonly apiService: ApiService) { }
  ingredients:ShoppedIngredient[] = []
  uploadedIngredient:BehaviorSubject<ShoppedIngredient| Ingredient | null> =
    new BehaviorSubject<ShoppedIngredient | Ingredient | null>(null);
  async getIngredients() {
    this.apiService.getIngredients().pipe(map(data => {
      const results = []
      for(const key in data) {
        results.push({...data[key], id: key})
      }
      return results
    })).subscribe(data => {
      this.ingredients =[...data];
    })
  }

  async addIngredient() {
    (await this.apiService.addIngredient(this.uploadedIngredient.value as Ingredient)).subscribe(data => {
      this.ingredients = data as ShoppedIngredient[]
    })
  }
  async updateIngredient() {
    (await this.apiService.updateIngredient(this.uploadedIngredient.value as ShoppedIngredient)).subscribe(data => {
      this.ingredients = data as ShoppedIngredient[]
    })
  }

  async deleteIngredient(id: string) {
    await this.apiService.deleteIngredient(id);
    this.ingredients.splice(this.ingredients.findIndex(ingredient => ingredient.id === id), 1);
  }
}
