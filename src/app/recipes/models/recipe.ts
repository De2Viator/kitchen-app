export interface Recipe {
    description: string;
    id: string;
    image: string;
    ingredients: Ingredient[]
    name:string;
    date: string;
}

export interface UploadedRecipe {
  image: File;
  name: string;
  description: string;
  ingredients: Ingredient[];
  date: string;

}


export interface Ingredient {
  name: string;
  amount: number;
}
