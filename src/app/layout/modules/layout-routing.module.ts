import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout.component';

const routes: Routes = [
  {path:'', component:LayoutComponent ,children:[
    {path:'recipes-list', loadChildren: () => import('../../recipe/recipe.module').then(m => m.RecipeModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
