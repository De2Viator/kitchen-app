import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { IIngridient } from './shared/ingridient';
import { IRecipe } from './shared/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API='https://kitchen-app-1f837-default-rtdb.firebaseio.com';

  constructor(private http:HttpClient, private auth:AuthService) { }

  getRecipes(){
    return this.auth.user.pipe(
    take(1),
    exhaustMap(user => {
      return this.http.get<{ [key:string]:IRecipe }>(`${this.API}/recipes.json?auth=${user?.token}`)
    }),
    map(data => {
      let dataArr = [];
      for(const key in data) {
        if(data[key]){
          dataArr.push({...data[key], id:key})
        }
      }
      return dataArr
    }));
  }

  changeRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.put<{[key:string]:string}>(`${this.API}/recipes/${recipe.id}.json`,body);
  }

  addRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.post<{[key:string]:string}>(`${this.API}/recipes.json`,body);
  }

  deleteRecipe(id:string): Observable<Object>  {
    return this.http.delete<{[key:string]:string}>(`${this.API}/recipes/${id}.json`);
  }

  addIngridient(ingridient:IIngridient) {
    const body = ingridient;
    return this.http.post<{ [key:string]:string }>(`${this.API}/ingridients.json`,body)
  }

  changeIngridient(ingridient:IIngridient): Observable<Object>  {
    const body = ingridient;
    return this.http.put<{ [key:string]:string }>(`${this.API}/ingridients/${ingridient.id}.json`,body);
  }

  getIngridients() {
    return this.http.get<{ [key:string]:IIngridient }>(`${this.API}/ingridients.json`).pipe(map(data => {
      let dataArr:IIngridient[] = []
      for(const key in data) {
        if(data[key]) {
          dataArr.push({...data[key],id:key})
        }
      }
      return dataArr;
    }))
  }

  deleteIngridient(id:string) {
    return this.http.delete<{[key:string]:string}>(`${this.API}/ingridients/${id}.json`);
  }
}
