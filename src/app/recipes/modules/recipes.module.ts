import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesService } from '../services/recipes.service';
import { RecipesListModule } from '../recipes-list/modules/recipes-list.module';
import { RecipeDetailsModule } from '../recipe-details/modules/recipe-details.module';
import {RecipeUploadModule} from "../recipe-upload/modules/recipe-upload.module";


@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    RecipesListModule,
    RecipeDetailsModule,
    RecipeUploadModule
  ],
  providers:[RecipesService]
})
export class RecipesModule { }
