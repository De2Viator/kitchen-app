import { Component } from '@angular/core';
import {ShoppingService} from "../services/shopping.service";
import {ActivatedRoute} from "@angular/router";
import {ShoppedIngredient} from "../models/shopped";
import {Ingredient} from "../../recipes/models/recipe";

@Component({
  selector: 'app-shopping',
  templateUrl: '../templates/shopping.component.html',
  styleUrls: ['../styles/shopping.component.scss']
})
export class ShoppingComponent {
  shoppings:ShoppedIngredient[] = [];
  constructor(public readonly shoppingService: ShoppingService, private route: ActivatedRoute) {
    this.shoppings = this.route.snapshot.data['ingredients'] || this.shoppingService.getIngredients();
  }

  addIngredient() {
    this.shoppingService.addIngredient(this.shoppingService.uploadedIngredient.value as Ingredient)
  }
}
