import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from '../components/layout.component';
import { HeaderModule } from '../../header/modules/header.module';
import { RecipesModule } from '../../recipes/modules/recipes.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HeaderModule,
    RecipesModule
  ]
})
export class LayoutModule { }
