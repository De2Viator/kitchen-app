
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlicerModule } from 'src/app/shared/slicer/slicer.module';
import { RecipeItemComponent } from './recipe-item.component';

@NgModule({
    declarations:[RecipeItemComponent],
    exports:[RecipeItemComponent],
    imports:[RouterModule, SlicerModule, CommonModule],
})
export class RecipeItemModule { }