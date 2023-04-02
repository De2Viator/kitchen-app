import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeUploadRoutingModule } from './recipe-upload-routing.module';
import { RecipeUploadComponent } from '../components/recipe-upload.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RecipeUploadComponent
  ],
  imports: [
    CommonModule,
    RecipeUploadRoutingModule,
    ReactiveFormsModule
  ],
  exports:[RecipeUploadComponent],
})
export class RecipeUploadModule { }
