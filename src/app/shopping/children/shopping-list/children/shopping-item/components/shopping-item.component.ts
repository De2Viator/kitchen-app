import {Component, Input} from '@angular/core';
import {ShoppedIngredient} from "../../../../../models/shopped";
import {ShoppingService} from "../../../../../services/shopping.service";

@Component({
  selector: 'app-shopping-item',
  templateUrl: '../templates/shopping-item.component.html',
  styleUrls: ['../styles/shopping-item.component.scss']
})
export class ShoppingItemComponent {
  constructor(public readonly shoppingService: ShoppingService) {}
  @Input() ingredient = {} as ShoppedIngredient;
  isEdit: boolean = false;
  updateIngredient() {
    this.shoppingService.updateIngredient()
  }
}
