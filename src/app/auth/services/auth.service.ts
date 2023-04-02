import { Injectable } from '@angular/core';
import {SignUser} from "../models/user";
import {ApiService} from "../../api.service";
import { from, Observable, tap} from "rxjs";
import firebase from "firebase/compat";
import {User} from "../../shared/classes/user/user";
import {InfoService} from "../../shared/services/info.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService, private infoService: InfoService) { }

  async signUp(signUser: SignUser): Promise<Observable<firebase.auth.UserCredential>>  {
    return from(Promise.resolve(this.apiService.signUp(signUser))).pipe(tap(data => this.setUser(data)))
  }

  async signIn(signUser: SignUser): Promise<Observable<firebase.auth.UserCredential>> {
    return from(Promise.resolve(this.apiService.signIn(signUser))).pipe(tap(data => this.setUser(data)))
  }

  async signOut() {
    await this.apiService.signOut();
    localStorage.removeItem('user');
    this.infoService.user.next(null)
  }

  async changePassword() {
    await this.apiService.changePassword(this.infoService.user.value?.email as string);
    await this.signOut();
  }

  private setUser(data: firebase.auth.UserCredential) {
    //@ts-ignore
    const delegate = data.user['_delegate'];
    console.log(data)
    const user = new User(delegate.accessToken,delegate.stsTokenManager.expirationTime, delegate.uid,
      delegate.email);
    localStorage.setItem('user', JSON.stringify(user))
    this.infoService.user.next(user)
  }
}
