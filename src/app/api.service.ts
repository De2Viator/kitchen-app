import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import {Recipe, UploadedRecipe} from './recipes/models/recipe';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  token:string|null|undefined = null;
  basePath = '/uploads';
  constructor(private http:HttpClient, private auth:AuthService, private fdb: AngularFireDatabase,
              private fst: AngularFireStorage) { }

  getRecipes(){
    return this.http.get<{[key: string]: Omit<Recipe, 'id'>}>(`${environment.firebase.databaseURL}/recipes.json`)
  }

  getRecipe(id: string){
    return this.http.get<Omit<Recipe, 'id'>>(`${environment.firebase.databaseURL}/recipes/${id}.json`)
  }
  addRecipeImage(image: File) {
    const filePath = `${this.basePath}/${image.name}`;
    const uploadTask = this.fst.upload(filePath, image, {
      contentType:image.type
    });

    return  uploadTask.snapshotChanges()
  }

  async addRecipeInfo(recipe: UploadedRecipe, image: string) {
    const ref:AngularFireList<Omit<Recipe,'id'>> = this.fdb.list('recipes');
    await ref.push({...recipe, image});
    return ref.valueChanges(['child_added'], {
      idField: 'id'
    })
  }



  /*changeRecipe(recipe:IRecipe): Observable<Object>  {
    const body = recipe;
    return this.http.put<{[key:string]:string}>(`${environment.dbPath}/recipes/${recipe.id}.json?auth=${this.token}`,body);
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
  }*/
}
