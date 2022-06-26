import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { HeaderModule } from './header/header.module';
import { RecipeModule } from './recipe/recipe.module';
import { ShoppingModule } from './shopping/shopping.module';

const appRoutes:Routes = [
  {path:'', redirectTo:'recipes-list', pathMatch:'full'},
  {path:'recipes-list', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)},
  {path:'shopping-list', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)},
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    HttpClientModule,
    NgbModule,
    ShoppingModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes),
    RouterModule,
    AuthModule,
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
