import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeResolver } from "../recipe.resolver";
import { RecipesResolver } from "../recipes.resolver";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

const appRoutes:Routes = [
    {path:'', resolve:{recipes:RecipesResolver} ,component:RecipeListComponent, children:[
        {path:':id/:name', component:RecipeDetailsComponent, resolve:{recipe:RecipeResolver}},
        {path:':id/:name/edit', component:RecipeEditComponent,  resolve:{recipe:RecipeResolver}},
        {path:'new', component:RecipeEditComponent},
    ]},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ],
  exports:[RouterModule],
})
export class RecipeRoutesModule { }