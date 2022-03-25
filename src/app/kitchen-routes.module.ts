import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListModule } from './recipe/recipe-list/recipe-list.module';
import { ShoppingListModule } from './shopping/shopping-list/shopping-list.module';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';


const appRoutes:Routes = [
{path:'', redirectTo:'recipes-list', pathMatch:'full'},
{path:'recipes-list', component:RecipeListComponent, children:[
  {path:':id/:name', component:RecipeDetailsComponent},
  {path:':id/:name/edit', component:RecipeEditComponent},
  {path:'new', component:RecipeEditComponent},
]},
{path:'shopping-list', component:ShoppingListComponent},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    ShoppingListModule,
  ]
})
export class KitchenRoutesModule { }
