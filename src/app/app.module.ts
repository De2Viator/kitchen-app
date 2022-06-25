import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { HeaderModule } from './header/header.module';
import { KitchenRoutesModule } from './kitchen-routes.module';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RecipeModule,
    ShoppingModule,
    HeaderModule,
    KitchenRoutesModule,
    RouterModule,
    AuthModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
