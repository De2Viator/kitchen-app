import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, map, Observable} from 'rxjs';
import { ApiService } from '../../api.service';
import {AddedRecipe, EditedRecipe, Recipe} from '../models/recipe';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[] = []
  recipe: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>({
    id:'',
    ingredients:[],
    image:'',
    date:new Date().toISOString(),
    description:'',
    name:''
  })
  constructor(private readonly apiService: ApiService, private fst: AngularFireStorage, private router: Router) { }
  getRecipes() {
    return this.apiService.getRecipes().pipe(map(data => {
      const results = []
      for(const key in data) {
        results.push({...data[key], id: key})
      }
      return results
    })).subscribe((data) => {
      this.recipes = data;
    });
  }

  getRecipe(id: string) {
    return this.apiService.getRecipe(id).subscribe(recipe => {
      if(recipe) this.recipe.next({...recipe, id})
      else this.router.navigate(['/recipes'])
    })
  }

  async updateRecipe(recipe: EditedRecipe) {
    if(recipe.image instanceof File) {
      const response = await this.apiService.updateRecipeImage(recipe.image, this.recipe.value.image)
      const storageRef = this.fst.ref(`${this.apiService.basePath}/${recipe.image.name}`);
      return new Observable((subscriber) => {
        response.subscribe(() => {
          storageRef.getDownloadURL().subscribe(async downloadURL => {
            (await this.apiService.updateRecipeInfo(recipe,this.recipe.value.id,downloadURL))
              .subscribe(data => {
                this.recipes = [...data]
              subscriber.next(recipe)
            });
          });
        })
      }).subscribe()
    } else {
      return (await this.apiService.updateRecipeInfo(recipe,this.recipe.value.id)).pipe(map(data => {
        this.recipes = [...data]
        return data
      })).subscribe()
    }
  }

  addRecipe(recipe: AddedRecipe) {
    const response = this.apiService.addRecipeImage(recipe.image);
    const storageRef = this.fst.ref(`${this.apiService.basePath}/${recipe.image.name}`);
    return new Observable<Recipe>((subscriber) => {
      response.pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(async downloadURL => {
            (await this.apiService.addRecipeInfo(recipe, downloadURL)).subscribe(data => {
              const recipe = data[data.length - 1] as Recipe;
              if(!recipe.ingredients) recipe.ingredients = [];
              this.recipes.push(recipe);
              subscriber.next(recipe)
            });
          });
        })
      ).subscribe(() => {})
    });
  }

  async deleteRecipe() {
    await this.apiService.deleteRecipe({
      id:this.recipe.value.id,
      image: this.recipe.value.image
    });
    this.recipes.splice(this.recipes.findIndex(recipe => recipe.id === this.recipe.value.id), 1);
  }
}
