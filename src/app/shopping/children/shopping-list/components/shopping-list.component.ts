import {Component, OnInit} from '@angular/core';
import {ShoppingService} from "../../../services/shopping.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: '../templates/shopping-list.component.html',
  styleUrls: ['../styles/shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit{
  constructor(public readonly shoppingService: ShoppingService) {}
  ngOnInit() {
    this.shoppingService.getIngredients()
  }
}
