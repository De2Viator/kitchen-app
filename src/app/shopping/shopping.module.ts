import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingEditModule } from './shopping-edit/shopping-edit.module';
import { ShoppingItemModule } from './shopping-item/shopping-item.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingRoutesModule } from './shopping-routing.module';
;

@NgModule({
    imports: [BrowserModule, ShoppingEditModule, ShoppingItemModule, ShoppingListModule, ShoppingRoutesModule],
    exports:[ ShoppingEditModule, ShoppingItemModule, ShoppingListModule, ShoppingRoutesModule],
})
export class ShoppingModule { }