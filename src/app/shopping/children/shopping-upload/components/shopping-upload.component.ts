import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppedIngredient} from "../../../models/shopped";
import {Subscription} from "rxjs";
import {ShoppingService} from "../../../services/shopping.service";

@Component({
  selector: 'app-shopping-upload',
  templateUrl: '../templates/shopping-upload.component.html',
  styleUrls: ['../styles/shopping-upload.component.scss']
})
export class ShoppingUploadComponent implements OnInit, OnDestroy {
  constructor(private readonly shoppingService: ShoppingService) {}
  @Input() ingredient:ShoppedIngredient = {
    name:'',
    amount:1,
    id:''
  };
  error: boolean = false;
  ingredientForm = new FormGroup({
    name: new FormControl(this.ingredient.name||'', {
      validators:[Validators.required]
    }),
    amount: new FormControl(this.ingredient.amount||1, {
      validators:[Validators.required, Validators.min(1)]
    })
  })
  ingredientFormSubscription = new Subscription();
  ngOnInit() {
    this.ingredientFormSubscription = this.ingredientForm.valueChanges.subscribe(data => {
      if(this.ingredientForm.valid) {
        this.shoppingService.uploadedIngredient.next({...data, id: this.ingredient.id} as ShoppedIngredient);
        this.error = false;
      } else if (this.ingredientForm.invalid && this.ingredientForm.dirty){
        this.error = true;
      }
    })
    this.updateForm()
  }

  updateForm() {
    const {name, amount} = this.ingredient
    this.ingredientForm.setValue({name:name||'', amount:amount||1})
  }

  ngOnDestroy() {
    this.ingredientFormSubscription.unsubscribe();
  }
}
