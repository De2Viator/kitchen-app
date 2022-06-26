import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingEditModule } from '../shopping-edit/shopping-edit.module';
import { ShoppingItemModule } from '../shopping-item/shopping-item.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ ShoppingListComponent],
  exports:[ShoppingListComponent],
  imports: [ShoppingEditModule, ShoppingItemModule, CommonModule, ReactiveFormsModule],
})
export class ShoppingListModule { }
