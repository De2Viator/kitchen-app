import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from '../components/recipes-list.component';
import { RecipeItemComponent } from '../recipe-item/components/recipe-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RecipesListComponent],
  imports: [
    CommonModule,
    RecipeItemComponent,
    RouterModule
  ],
  exports: [RecipesListComponent],
})
export class RecipesListModule { }
