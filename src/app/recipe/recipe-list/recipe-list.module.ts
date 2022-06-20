import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { KitchenRoutesModule } from 'src/app/kitchen-routes.module';
import { RecipeDetailsModule } from '../recipe-details/recipe-details.module';
import { RecipeEditModule } from '../recipe-edit/recipe-edit.module';
import { RecipeItemModule } from '../recipe-item/recipe-item.module';
import { RecipeService } from '../recipe.service';
import { RecipeListComponent } from './recipe-list.component';

@NgModule({
  declarations: [RecipeListComponent],
  exports:[RecipeListComponent],
  imports: [BrowserModule, 
            RecipeItemModule, 
            RecipeDetailsModule, 
            RouterModule, 
            KitchenRoutesModule, 
            RecipeEditModule],
  providers:[RecipeService]
})
export class RecipeListModule {}
