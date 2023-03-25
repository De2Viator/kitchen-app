import { Component } from '@angular/core';
import {ShoppingService} from "../services/shopping.service";

@Component({
  selector: 'app-shopping',
  templateUrl: '../templates/shopping.component.html',
  styleUrls: ['../styles/shopping.component.scss']
})
export class ShoppingComponent {
  constructor(public readonly shoppingService: ShoppingService) {}
}
