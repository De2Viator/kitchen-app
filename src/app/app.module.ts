import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeListModule } from './recipe/recipe-list/recipe-list.module';
import { ShoppingListModule } from './shopping/shopping-list/shopping-list.module';
import { HeaderModule } from './header/header.module';
import { ShoppingService } from './shopping/shopping.service';
import { KitchenRoutesModule } from './kitchen-routes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RecipeListModule,
    ShoppingListModule,
    HeaderModule,
    KitchenRoutesModule,
    RouterModule,
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
