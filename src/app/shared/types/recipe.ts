import { IIngridient } from "./ingridient";

export interface IRecipe {
    id:string;
    name:string,
    description:string,
    image:string,
    ingridients:IIngridient[];
}