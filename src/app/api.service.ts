import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { IIngridient } from './shared/types/ingridient';
import { IRecipe } from './shared/types/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API='https://kitchen-app-1f837-default-rtdb.firebaseio.com';
  token:string|null|undefined = null;

  constructor(private http:HttpClient, private auth:AuthService) { }

  getRecipes(){
    return this.getArrays<IRecipe>(`${this.API}/recipes.json?auth=${this.token}`) 
  }
  

  changeRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.put<{[key:string]:string}>(`${this.API}/recipes/${recipe.id}.json?auth=${this.token}`,body);
  }

  addRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.post<{[key:string]:string}>(`${this.API}/recipes.json?auth=${this.token}`,body);
  }

  deleteRecipe(id:string): Observable<Object>  {
    return this.http.delete<{[key:string]:string}>(`${this.API}/recipes/${id}.json?auth=${this.token}`);
  }

  addIngridient(ingridient:IIngridient) {
    const body = ingridient;
    return this.http.post<{ [key:string]:string }>(`${this.API}/ingridients.json?auth=${this.token}`,body)
  }

  changeIngridient(ingridient:IIngridient): Observable<Object>  {
    const body = ingridient;
    return this.http.put<{ [key:string]:string }>
    (`${this.API}/ingridients/${ingridient.id}.json?auth=${this.token}`,body);
  }

  getIngridients() {
    return this.getArrays<IIngridient>(`${this.API}/ingridients.json?auth=${this.token}`)
  }

  getArrays<T>(url:string) {
    if(this.token === null) {
      return this.auth.user.pipe(
        exhaustMap(user => {
          if(user === null) {
            this.token = null;
          } else {
            this.token = user?.token;
          } 
          return this.http.get<{ [key:string]:T }>(url)
        }),
        map(data => {
          console.log()
          let dataArr = [];
          for(const key in data) {
            if(data[key]){
              dataArr.push({...data[key], id:key})
            }
          }
          return dataArr
        }));
    } else {
      return this.http.get<{ [key:string]:T }>(url)
      .pipe(map(data => {
        let dataArr = [];
        for(const key in data) {
          if(data[key]){
            dataArr.push({...data[key], id:key})
          }
        }
        return dataArr
      }));
    }
  }

  deleteIngridient(id:string) {
    return this.http.delete<{[key:string]:string}>(`${this.API}/ingridients/${id}.json?auth=${this.token}`);
  }
}
