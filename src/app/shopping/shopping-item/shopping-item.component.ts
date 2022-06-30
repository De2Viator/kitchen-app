import { Component, Input, OnInit } from '@angular/core';
import { IIngridient } from 'src/app/shared/types/ingridient';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent  {
  constructor(private shoppingService:ShoppingService){}
  @Input() ingridient = {} as IIngridient;

  onEditItem():void {
    this.shoppingService.editStart.next(this.ingridient.id);
  }

}
