import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {DeletedRecipe, EditedRecipe, Ingredient, Recipe, UploadedRecipe} from './recipes/models/recipe';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ShoppedIngredient} from "./shopping/models/shopped";
import {SignUser} from "./auth/models/user";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  basePath = '/uploads';
  constructor(private http:HttpClient, private fdb: AngularFireDatabase, private fst: AngularFireStorage,
              private fAuth: AngularFireAuth) { }

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

  getIngredients() {
    return this.http.get<{[key: string]: Omit<Ingredient, 'id'>}>(`${environment.firebase.databaseURL}/ingredients.json`)
  }

  async addIngredient(ingredient:Omit<Ingredient,'id'>) {
    const ref:AngularFireList<Omit<Ingredient,'id'>> = this.fdb.list('ingredients');
    await ref.push({...ingredient});
    return ref.valueChanges(['child_added'], {
      idField: 'id'
    })
  }

  async updateIngredient(ingredient: ShoppedIngredient) {
    const {id, name, amount} = ingredient;
    const ref:AngularFireList<ShoppedIngredient> = this.fdb.list('ingredients');
    await ref.update(id, {name, amount})
    return ref.valueChanges(['child_changed'], {
      idField:'id'
    })
  }

  async deleteIngredient(id: string) {
    await this.fdb.list('ingredients').remove(id);
  }

  async signUp(user: SignUser) {
    const {email, password} = user;
    const createdUser = await this.fAuth.createUserWithEmailAndPassword(email, password);
    await createdUser.user?.sendEmailVerification();
    return createdUser;
  }

  async signIn(user: SignUser) {
    const {email, password} = user;
    return await this.fAuth.signInWithEmailAndPassword(email, password);
  }
}
