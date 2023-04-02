import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from '../components/shopping.component';
import {ShoppingListModule} from "../children/shopping-list/modules/shopping-list.module";
import {ShoppingUploadModule} from "../children/shopping-upload/modules/shopping-upload.module";


@NgModule({
  declarations: [
    ShoppingComponent,
  ],
    imports: [
        CommonModule,
        ShoppingRoutingModule,
        ShoppingListModule,
        ShoppingUploadModule,
    ],
  exports:[ShoppingComponent]
})
export class ShoppingModule { }
