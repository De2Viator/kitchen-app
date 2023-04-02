import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingItemComponent } from '../components/shopping-item.component';
import {ShoppingUploadModule} from "../../../../shopping-upload/modules/shopping-upload.module";



@NgModule({
  declarations: [
    ShoppingItemComponent
  ],
    imports: [
        CommonModule,
        ShoppingUploadModule
    ],
  exports:[ShoppingItemComponent]
})
export class ShoppingItemModule { }
