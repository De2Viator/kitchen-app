import { Component, Input} from '@angular/core';
import { IRecipe } from 'src/app/shared/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe = {} as IRecipe;
}
