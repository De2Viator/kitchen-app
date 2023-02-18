import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from '../components/recipes-list.component';
import { RecipeItemComponent } from '../recipe-item/components/recipe-item.component';



@NgModule({
  declarations: [RecipesListComponent],
  imports: [
    CommonModule,
    RecipeItemComponent
  ],
  exports: [RecipesListComponent],
})
export class RecipesListModule { }
