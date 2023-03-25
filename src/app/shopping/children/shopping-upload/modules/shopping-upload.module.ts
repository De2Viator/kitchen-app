import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingUploadComponent } from '../components/shopping-upload.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ShoppingUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ShoppingUploadComponent]
})
export class ShoppingUploadModule { }
