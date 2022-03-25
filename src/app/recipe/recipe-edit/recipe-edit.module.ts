import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditComponent } from './recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [RecipeEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  exports:[RecipeEditComponent],
  providers:[NgbToastModule]
})
export class RecipeEditModule { }
