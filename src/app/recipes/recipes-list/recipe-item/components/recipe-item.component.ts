import { SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlicerPipe } from '../../../../shared/slicer/slicer.pipe';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: '../templates/recipe-item.component.html',
  styleUrls: ['../styles/recipe-item.component.scss'],
  standalone: true,
  imports:[RouterModule, SlicerPipe],
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
}
