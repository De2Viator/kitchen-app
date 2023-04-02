import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../environments/environment';
import {DeletedRecipe, EditedRecipe, Ingredient, Recipe, UploadedRecipe} from './recipes/models/recipe';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {ShoppedIngredient} from "./shopping/models/shopped";
import {SignUser} from "./auth/models/user";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {InfoService} from "./shared/services/info.service";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http:HttpClient, private fdb: AngularFireDatabase, private fst: AngularFireStorage,
              private fAuth: AngularFireAuth, private readonly infoService: InfoService) {}
  uid = this.infoService.user.value?.id;
  basePath = `${this.uid}`;
  getRecipes(){
    return this.http.get<{[key: string]: Omit<Recipe, 'id'>}>
    (`${environment.firebase.databaseURL}/recipes/${this.uid}.json`)
  }

  getRecipe(id: string){
    return this.fdb.object<Omit<Recipe, 'id'>>(`recipes/${this.uid}/${id}`).valueChanges()
  }
  addRecipeImage(image: File) {

    const filePath = `${this.basePath}/${image.name}`;
    const uploadTask: AngularFireUploadTask = this.fst.upload(filePath,image, {
      contentType:image.type,
    })

    return uploadTask.snapshotChanges();
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
    const ref:AngularFireList<Omit<Recipe,'id'>> = this.fdb.list(`recipes/${this.uid}`);
    await ref.push({...recipe, image});
    return ref.valueChanges(['child_added'], {
      idField: 'id'
    })
  }

  async updateRecipeInfo(recipe: EditedRecipe, id:string, image?: string) {
    const ref:AngularFireList<Recipe> = this.fdb.list(`recipes/${this.uid}`);
    if(image) await ref.update(id, {...recipe, image})
    else await ref.update(id, {...recipe as Recipe})
    return ref.valueChanges(['child_changed'], {
      idField:'id'
    })
  }
  async deleteRecipe(info: DeletedRecipe) {
    await this.fdb.list(`recipes/${this.uid}`).remove(info.id);
    await this.deleteRecipeImage(info.image)
  }

  getIngredients() {
    return this.http.get<{[key: string]: Omit<Ingredient, 'id'>}>
    (`${environment.firebase.databaseURL}/ingredients/${this.uid}.json`)
  }

  async addIngredient(ingredient:Omit<Ingredient,'id'>) {
    const ref:AngularFireList<Omit<Ingredient,'id'>> = this.fdb.list(`ingredients/${this.uid}`);
    await ref.push({...ingredient});
    return ref.valueChanges(['child_added'], {
      idField: 'id'
    })
  }

  async updateIngredient(ingredient: ShoppedIngredient) {
    const {id, name, amount} = ingredient;
    const ref:AngularFireList<ShoppedIngredient> = this.fdb.list(`ingredients/${this.uid}`);
    await ref.update(id, {name, amount})
    return ref.valueChanges(['child_changed'], {
      idField:'id'
    })
  }

  async deleteIngredient(id: string) {
    await this.fdb.list(`ingredients/${this.uid}`).remove(id);
  }

  async signUp(user: SignUser) {
    const {email, password} = user;
    await this.fAuth.createUserWithEmailAndPassword(email, password);
    return await this.fAuth.signInWithEmailAndPassword(email, password);
  }

  async signIn(user: SignUser) {
    const {email, password} = user;
    return await this.fAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return await this.fAuth.signOut()
  }

  async changePassword(email: string) {
    return await this.fAuth.sendPasswordResetEmail(email)
  }
}
