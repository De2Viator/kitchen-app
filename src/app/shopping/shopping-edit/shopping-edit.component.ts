import { Component, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IIngridient } from 'src/app/shared/ingridient';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('form') form!:NgForm;
  id:string = '';
  editMode:boolean = false;
  constructor(private shoppingService:ShoppingService) {}

  addIngridient(): void {
    this.shoppingService.addIngridient({
      name:this.form.controls['name'].value,
      amount:this.form.controls['amount'].value,
      id:this.id
    } as IIngridient)
    this.form.reset();
  }

  changeIngridient(): void {
    this.shoppingService.changeIngridient({
      name:this.form.controls['name'].value,
      amount:this.form.controls['amount'].value,
      id:this.id
    } as IIngridient)
    this.editMode = false;
    this.form.reset();
  }

  deleteIngridient(): void {
    this.shoppingService.deleteIngridient(this.id);
    this.form.reset();
  }

  clearForm(): void {
    this.form.reset();
    this.editMode = false;
    this.id = '';
  }

  ngOnInit(): void {
    this.shoppingService.editStart.subscribe((id:string) => {
      this.id = id;
      this.editMode = true;
      this.form.controls['name'].setValue(this.shoppingService.getIngridient(id).name);
      this.form.controls['amount'].setValue(this.shoppingService.getIngridient(id).amount)
    })
  }
}
