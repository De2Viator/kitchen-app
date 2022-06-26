import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit.component';

@NgModule({
  declarations: [ ShoppingEditComponent],
  exports:[ShoppingEditComponent],
  imports: [FormsModule, CommonModule],
})
export class ShoppingEditModule { }
