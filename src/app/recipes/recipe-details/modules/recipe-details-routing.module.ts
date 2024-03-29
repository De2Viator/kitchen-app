import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeDetailsComponent} from "../components/recipe-details.component";

const routes: Routes = [{path:'', component:RecipeDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeDetailsRoutingModule { }
