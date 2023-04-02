import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout.component';
import {ShoppingResolver} from "../../shopping/resolvers/shopping.resolver";

const routes: Routes = [
  {path:'', component:LayoutComponent ,children:[
    {path:'recipes', loadChildren: () => import('../../recipes/modules/recipes.module').then(m => m.RecipesModule)},
      {path:'profile', loadChildren: () => import('../../profile/modules/profile.module').then(m => m.ProfileModule),},
      {path:'shopping', loadChildren: () => import('../../shopping/modules/shopping.module').then(m => m.ShoppingModule)
      , resolve:{ingredients: ShoppingResolver}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
