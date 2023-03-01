import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from '../recipe-details/components/recipe-details.component';
import { RecipesListComponent } from '../recipes-list/components/recipes-list.component';

const routes: Routes = [
  {path:'', component: RecipesListComponent, children:[
    {path:'upload', loadChildren:() => import('../recipe-upload/modules/recipe-upload.module')
        .then(m => m.RecipeUploadModule)},
    {path:':id', component: RecipeDetailsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
