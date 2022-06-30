import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthRequest, IAuthResponse } from '../shared/types/auth';
import { Errors } from '../shared/types/errors';
import { User } from '../shared/types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private router:Router){}
  user = new Subject<User|null>();
  isAuth = false;
  timer:any;

  signUp(signForm:IAuthRequest): Observable<IAuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`;
    const body = signForm
    return this.http.post<IAuthResponse>(url ,body)
    .pipe(catchError(error => {
      return this.handlerError(error, 'sign');
    }), tap(data => {
      this.handleAuth(data);
    }));
  }

  autoLogin() {
    let user:string|null = localStorage.getItem('userData');
    if(!user) {
      return;
    } else {
      const loadedUser = JSON.parse(user);
      const expirationDate = new Date((new Date().getTime() + +loadedUser.expiresIn) * 1000)
      const realUser = new User(loadedUser.email, loadedUser.localId, loadedUser.idToken, expirationDate);
      if(realUser.token) {
        const timer = new Date(expirationDate).getTime() - new Date().getTime()
        this.autoLogout(timer);
        this.isAuth = true;
        this.user.next(realUser)
      }
    }
  }

  logIn(logForm:IAuthRequest) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`;
    const body = logForm;
    return this.http.post<IAuthResponse>(url,body)
    .pipe(catchError(error => {
      return this.handlerError(error, 'login');
    }),tap(data => {
      this.handleAuth(data);
      localStorage.setItem('userData', JSON.stringify(data))
    }))
  }

  private handleAuth(userData:IAuthResponse) {
    const expirationDate = new Date((new Date().getTime() + +userData.expiresIn) * 1000);
    const user = new User(userData.email, userData.localId, userData.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+userData.expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
    this.isAuth = true;
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData')
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.isAuth = false;
  }

  autoLogout(time:number) {
    const timer = time * 1000;
    this.timer = setTimeout(() => {
      this.logOut()
    }, timer)
    this.isAuth = false;
  }

  private handlerError(error:HttpErrorResponse,state:string) {
    let err = 'Unexpected error';
    const errMes = error.error.error.message
    if(state === 'sign') {
      switch (errMes) {
        case Errors.emailExist:
          err = 'Email was exist'
          break;
        case Errors.manyAttempts:
          err = 'Many attempts in last time'
          break;
      }
    } 
    else if(state === 'login') {
      switch (errMes) {
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
