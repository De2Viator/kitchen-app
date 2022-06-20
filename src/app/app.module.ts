import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingListModule } from './shopping/shopping-list/shopping-list.module';
import { HeaderModule } from './header/header.module';
import { ShoppingService } from './shopping/shopping.service';
import { KitchenRoutesModule } from './kitchen-routes.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RecipeModule,
    ShoppingModule,
    HeaderModule,
    KitchenRoutesModule,
    RouterModule,
    AuthModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
