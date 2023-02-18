import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout.component';

const routes: Routes = [
  {path:'', component:LayoutComponent ,children:[
    {path:'recipes', loadChildren: () => import('../../recipes/modules/recipes.module').then(m => m.RecipesModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
