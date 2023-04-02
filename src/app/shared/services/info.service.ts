import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../classes/user/user";

const parsedUser: User | null = JSON.parse(localStorage.getItem('user')||'null');
@Injectable({
  providedIn: 'root'
})
export class InfoService {
  user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>
  (parsedUser ? new User(parsedUser.token, parsedUser.expiredTime, parsedUser.id) : null)
  constructor() { }
}
