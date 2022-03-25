import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingEditModule } from '../shopping-edit/shopping-edit.module';
import { ShoppingItemComponent } from './shopping-item.component';

@NgModule({
  declarations: [ ShoppingItemComponent],
  exports:[ShoppingItemComponent],
  imports: [BrowserModule],
})
export class ShoppingItemModule { }