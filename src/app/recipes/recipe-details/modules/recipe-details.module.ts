import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailsComponent } from '../components/recipe-details.component';
import { RouterModule} from "@angular/router";
import {RecipeDetailsRoutingModule} from "./recipe-details-routing.module";



@NgModule({
  declarations: [
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipeDetailsRoutingModule,
    RouterModule
  ]
})
export class RecipeDetailsModule { }
