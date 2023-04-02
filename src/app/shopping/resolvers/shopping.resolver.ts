import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {ShoppingService} from "../services/shopping.service";
import {ShoppedIngredient} from "../models/shopped";

export const ShoppingResolver: ResolveFn<ShoppedIngredient[]> = async () => {
  const shoppingService = inject(ShoppingService);
  await shoppingService.getIngredients();
  return shoppingService.ingredients;
}
