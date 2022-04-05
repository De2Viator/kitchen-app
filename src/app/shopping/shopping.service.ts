
import { Injectable } from "@angular/core";
import { Subject, tap } from "rxjs";
import { ApiService } from "../api.service";
import { IIngridient } from "../shared/ingridient";
@Injectable()
export class ShoppingService {
  constructor(private api:ApiService){}
  editStart = new Subject<string>();
  editEnd = new Subject<string>();
  ingridients:IIngridient[] = []

  getIngridients(): IIngridient[] {
    let ingridients:IIngridient[] = [];
    this.api.getIngridients()
    .pipe(tap((data:any) => {
      data.forEach((el:any) => this.ingridients.push(el))
    }))
    .subscribe(data => {
      ingridients.push(...data);
    });
    return ingridients;
  }

  getIngridient(id:string) {
    console.log(id)
    let ingridient = {} as IIngridient;
    this.ingridients.forEach(el => {
      if(el.id === id){
        ingridient = el;
      }
    });
    return ingridient;
  }

  addIngridient(ingridient:IIngridient): void {
    this.api.addIngridient(ingridient).subscribe(data => {
      this.ingridients = this.getIngridients();
      this.editEnd.next(ingridient.id);
    });
  }

  changeIngridient(ingridient:IIngridient): void {
    this.api.changeIngridient(ingridient).subscribe(data => {
      this.ingridients = this.getIngridients();
      this.editEnd.next(ingridient.id);
    });
  }

  deleteIngridient(id:string): void {
    this.api.deleteIngridient(id).subscribe(data => {
      this.ingridients = this.getIngridients();
      this.editEnd.next(id);
    });
  }

  shopIngridients(ingridients:IIngridient[]): void {
    ingridients.forEach(el => {
      this.api.addIngridient(el).subscribe(data => {
        this.ingridients = this.getIngridients();
      });
    })
  }
}
