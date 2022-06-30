
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlicerPipe } from 'src/app/shared/slicer/slicer.pipe';
import { RecipeItemComponent } from './recipe-item.component';

@NgModule({
    declarations:[RecipeItemComponent],
    exports:[RecipeItemComponent],
    imports:[RouterModule, SlicerPipe, CommonModule],
})
export class RecipeItemModule { }