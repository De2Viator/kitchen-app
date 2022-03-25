import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingEditComponent } from './shopping-edit.component';

@NgModule({
  declarations: [ ShoppingEditComponent],
  exports:[ShoppingEditComponent],
  imports: [BrowserModule, FormsModule],
})
export class ShoppingEditModule { }
