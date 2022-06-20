import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeRoutesModule } from './recipe/recipe-routing.module';


const appRoutes:Routes = [
{path:'', redirectTo:'recipes-list', pathMatch:'full'},
{path:'auth', component:AuthComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    RecipeRoutesModule
  ]
})
export class KitchenRoutesModule { }
