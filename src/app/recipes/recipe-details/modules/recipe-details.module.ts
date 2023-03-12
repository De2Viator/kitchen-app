import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailsComponent } from '../components/recipe-details.component';
import { RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class RecipeDetailsModule { }
