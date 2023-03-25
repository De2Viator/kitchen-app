import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from '../components/shopping-list.component';
import {ShoppingItemModule} from "../children/shopping-item/modules/shopping-item.module";
import {ShoppingUploadModule} from "../../shopping-upload/modules/shopping-upload.module";



@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    ShoppingItemModule,
    ShoppingUploadModule,
  ],
  exports:[ShoppingListComponent]
})
export class ShoppingListModule { }
