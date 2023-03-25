import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from '../recipes-list/components/recipes-list.component';

const routes: Routes = [
  {path:'', component:RecipesListComponent, children:[
    {path:'upload', loadChildren:() => import('../recipe-upload/modules/recipe-upload.module')
        .then(m => m.RecipeUploadModule)},
      {path:'edit/:id', loadChildren:() => import('../recipe-upload/modules/recipe-upload.module')
          .then(m => m.RecipeUploadModule)},
    {path:':id', loadChildren:() => import('../recipe-details/modules/recipe-details.module').then(m => m.RecipeDetailsModule)},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
