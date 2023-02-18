import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesService } from '../services/recipes.service';
import { RecipesListModule } from '../recipes-list/modules/recipes-list.module';


@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    RecipesListModule
  ],
  providers:[RecipesService]
})
export class RecipesModule { }
