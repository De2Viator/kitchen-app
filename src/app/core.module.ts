import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShoppingService } from './shopping/shopping.service';


@NgModule({
    providers: [ShoppingService],
    bootstrap: [AppComponent]
})
export class CoreModule {} 