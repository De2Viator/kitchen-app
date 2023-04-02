import { Component } from '@angular/core';
import {ShoppingService} from "../services/shopping.service";
import {Ingredient} from "../../recipes/models/recipe";

@Component({
  selector: 'app-shopping',
  templateUrl: '../templates/shopping.component.html',
  styleUrls: ['../styles/shopping.component.scss']
})
export class ShoppingComponent {
  constructor(public readonly shoppingService: ShoppingService) {}

  addIngredient() {
    this.shoppingService.addIngredient(this.shoppingService.uploadedIngredient.value as Ingredient)
  }
}
