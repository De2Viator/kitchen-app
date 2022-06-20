import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RecipeDetailsModule } from "./recipe-details/recipe-details.module";
import { RecipeEditModule } from "./recipe-edit/recipe-edit.module";
import { RecipeItemModule } from "./recipe-item/recipe-item.module";
import { RecipeListModule } from "./recipe-list/recipe-list.module";
import { RecipeRoutesModule } from "./recipe-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RecipeListModule,
    RecipeItemModule,
    RecipeRoutesModule,
    RecipeEditModule,
    RecipeDetailsModule,
    RecipeRoutesModule
  ],
  exports:[
    CommonModule,
    RecipeListModule,
    RecipeItemModule,
    RecipeRoutesModule,
    RecipeEditModule,
    RecipeDetailsModule,
    RecipeRoutesModule
  ],
})
export class RecipeModule { }