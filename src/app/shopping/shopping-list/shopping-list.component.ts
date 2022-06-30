import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IIngridient } from 'src/app/shared/types/ingridient';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: IIngridient[] = [];
  constructor(private shoppingService: ShoppingService) {}
  editSubscription:Subscription = this.shoppingService.editEnd.subscribe(data => {
    this.ingridients = this.shoppingService.getIngridients();
  })

  ngOnInit(): void {
    this.ingridients = this.shoppingService.getIngridients();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
