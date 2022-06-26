import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingItemComponent } from './shopping-item.component';

@NgModule({
  declarations: [ ShoppingItemComponent],
  exports:[ShoppingItemComponent],
  imports:[CommonModule],
})
export class ShoppingItemModule { }