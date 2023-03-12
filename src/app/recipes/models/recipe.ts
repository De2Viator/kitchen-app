export interface Recipe {
    description: string;
    id: string;
    image: string;
    ingredients: Ingredient[]
    name:string;
    date: string;
}

export interface UploadedRecipe {
  name: string;
  description: string;
  ingredients: Ingredient[];
  date: string;

}
export interface AddedRecipe extends UploadedRecipe {
  image: File;
}

export interface EditedRecipe extends UploadedRecipe{
  image: File|string;
}


export interface Ingredient {
  name: string;
  amount: number;
}
