import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { IAuthRequest, IAuthResponse } from '../shared/auth';
import { Errors } from '../shared/errors';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient){}
  user = new Subject<User>();

  KEY = 'AIzaSyDHXgi-XUi1AdZw_lKV6lYzO1Az5AQEMJw'
  signUpKey = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.KEY}`;
  logInKey = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.KEY}`

  signUp(signForm:IAuthRequest): Observable<IAuthResponse> {
    const body = signForm
    return this.http.post<IAuthResponse>(this.signUpKey ,body)
    .pipe(catchError(error => {
      return this.handlerError(error, 'sign');
    }), tap(data => {
      this.handleAuth(data);
    }));
  }

  logIn(logForm:IAuthRequest) {
    const body = logForm;
    return this.http.post<IAuthResponse>(this.logInKey,body)
    .pipe(catchError(error => {
      return this.handlerError(error, 'login');
    }),tap(data => {
      this.handleAuth(data);
    }))
  }

  private handleAuth(userData:IAuthResponse) {
    const expirationDate = new Date((new Date().getTime() + +userData.expiresIn) * 1000)
    const user = new User(userData.email,userData.localId,userData.idToken,expirationDate);
    this.user.next(user);
  }

  private handlerError(error:HttpErrorResponse,state:string) {
    let err = 'Unexpected error'
    if(state === 'sign') {
      switch (error.error.error.message) {
        case Errors.emailExist:
          err = 'Email was exist'
          break;
        case Errors.manyAttempts:
          err = 'Many attempts in last time'
          break;
      }
    } 
    else if(state === 'login') {
      switch (error.error.error.message) {
        case Errors.invalidPassword:
          err = 'Invalid Password'
          break;
        case Errors.emailNotFound:
          err = 'Email wasn\'t found'
          break;
        case Errors.userDisabled:
          err = 'You was disabled by Administrator'
          break;
      } 
    }
    return throwError(() => err)
  }
}
