import {Ingredient} from "../../recipes/models/recipe";

export interface ShoppedIngredient extends Ingredient{
  id: string;
}
