import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeDetailsModule } from '../recipe-details/recipe-details.module';
import { RecipeEditModule } from '../recipe-edit/recipe-edit.module';
import { RecipeItemModule } from '../recipe-item/recipe-item.module';
import { RecipeService } from '../recipe.service';
import { RecipeListComponent } from './recipe-list.component';

@NgModule({
  declarations: [RecipeListComponent],
  exports:[RecipeListComponent],
  imports: [RecipeItemModule, 
            RecipeDetailsModule, 
            RouterModule, 
            RecipeEditModule,
            CommonModule],
  providers:[RecipeService]
})
export class RecipeListModule {}
