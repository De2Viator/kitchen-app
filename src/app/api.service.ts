import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { exhaustMap, map, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { IIngridient } from './shared/types/ingridient';
import { IRecipe } from './shared/types/recipe';
import { environment } from '../environments/environment';
import { Recipe } from './recipes/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token:string|null|undefined = null;

  constructor(private http:HttpClient, private auth:AuthService) { }

  getRecipes(){
    return this.http.get<{[key: string]: Recipe}>(`${environment.dbPath}/recipes.json`)
  }
  

  changeRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.put<{[key:string]:string}>(`${environment.dbPath}/recipes/${recipe.id}.json?auth=${this.token}`,body);
  }

  addRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.post<{[key:string]:string}>(`${environment.dbPath}/recipes.json?auth=${this.token}`,body);
  }

  deleteRecipe(id:string): Observable<Object>  {
    return this.http.delete<{[key:string]:string}>(`${environment.dbPath}/recipes/${id}.json?auth=${this.token}`);
  }

  addIngridient(ingridient:IIngridient) {
    const body = ingridient;
    return this.http.post<{ [key:string]:string }>(`${environment.dbPath}/ingridients.json?auth=${this.token}`,body)
  }

  changeIngridient(ingridient:IIngridient): Observable<Object>  {
    const body = ingridient;
    return this.http.put<{ [key:string]:string }>
    (`${environment.dbPath}/ingridients/${ingridient.id}.json?auth=${this.token}`,body);
  }

  getIngridients() {
    return this.getArrays<IIngridient>(`${environment.dbPath}/ingridients.json?auth=${this.token}`)
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
    return this.http.delete<{[key:string]:string}>(`${environment.dbPath}/ingridients/${id}.json?auth=${this.token}`);
  }
}
