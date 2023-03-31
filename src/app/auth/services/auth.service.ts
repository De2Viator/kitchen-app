import { Injectable } from '@angular/core';
import {SignUser} from "../models/user";
import {ApiService} from "../../api.service";
import {BehaviorSubject, from, Observable, tap} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<firebase.auth.UserCredential|null> = new BehaviorSubject<firebase.auth.UserCredential|null>(null)
  constructor(private apiService: ApiService) { }

  async signUp(signUser: SignUser): Promise<Observable<firebase.auth.UserCredential>>  {
    return from(Promise.resolve(this.apiService.signUp(signUser))).pipe(tap(data => {
      this.user.next(data)
    }))
  }

  async signIn(signUser: SignUser): Promise<Observable<firebase.auth.UserCredential>> {
    return from(Promise.resolve(this.apiService.signIn(signUser))).pipe(tap(data => {
      this.user.next(data)
      console.log(data)
    }))
  }
}
