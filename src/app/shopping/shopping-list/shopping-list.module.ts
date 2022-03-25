import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingEditModule } from '../shopping-edit/shopping-edit.module';
import { ShoppingItemModule } from '../shopping-item/shopping-item.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ ShoppingListComponent],
  exports:[ShoppingListComponent],
  imports: [BrowserModule, ShoppingEditModule, ShoppingItemModule],
})
export class ShoppingListModule { }
