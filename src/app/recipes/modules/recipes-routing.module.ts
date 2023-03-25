import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from "../components/recipes.component";
import {RecipesListComponent} from "../recipes-list/components/recipes-list.component";

const routes: Routes = [
  {path:'', component:RecipesComponent, children:[
      {path:'', component: RecipesListComponent, children:[
          {path:':id', loadChildren:() => import('../recipe-details/modules/recipe-details.module').then(m => m.RecipeDetailsModule)},
          {path:'upload', loadChildren:() => import('../recipe-upload/modules/recipe-upload.module')
              .then(m => m.RecipeUploadModule)},
          {path:'edit/:id', loadChildren:() => import('../recipe-upload/modules/recipe-upload.module')
              .then(m => m.RecipeUploadModule)},
        ]}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
