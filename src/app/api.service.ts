import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import {DeletedRecipe, EditedRecipe, Recipe, UploadedRecipe} from './recipes/models/recipe';
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
    return this.fdb.object<Omit<Recipe, 'id'>>(`recipes/${id}`).valueChanges()
  }
  addRecipeImage(image: File) {
    const filePath = `${this.basePath}/${image.name}`;
    const uploadTask = this.fst.upload(filePath, image, {
      contentType:image.type
    });

    return  uploadTask.snapshotChanges()
  }

  async deleteRecipeImage(image: string) {
    const name = image.match(/%2F.*\?/)![0].slice(3, -1);
    await this.fst.storage.ref(`${this.basePath}/${decodeURI(name)}`).delete()
  }

  async updateRecipeImage(image: File, oldImage: string) {
    await this.deleteRecipeImage(oldImage)
    return this.addRecipeImage(image)
  }

  async addRecipeInfo(recipe: UploadedRecipe, image: string) {
    const ref:AngularFireList<Omit<Recipe,'id'>> = this.fdb.list('recipes');
    await ref.push({...recipe, image});
    return ref.valueChanges(['child_added'], {
      idField: 'id'
    })
  }

  async updateRecipeInfo(recipe: EditedRecipe, id:string, image?: string) {
    const ref:AngularFireList<Recipe> = this.fdb.list('recipes');
    if(image) await ref.update(id, {...recipe, image})
    else await ref.update(id, {...recipe as Recipe})
    return ref.valueChanges(['child_changed'], {
      idField:'id'
    })
  }
  async deleteRecipe(info: DeletedRecipe) {
    await this.fdb.list('recipes').remove(info.id);
    await this.deleteRecipeImage(info.image)
  }


  /*

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


  deleteIngridient(id:string) {
    return this.http.delete<{[key:string]:string}>(`${environment.dbPath}/ingridients/${id}.json?auth=${this.token}`);
  }*/
}
