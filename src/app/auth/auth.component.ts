import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { IAuthRequest, IAuthResponse } from '../shared/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private auth: AuthService, 
              private router:Router,
              private viewContainerRef: ViewContainerRef) {}
  isLogin: boolean = true;
  isLoading = false;
  error:string|null = null;
  alertComponent = AlertComponent;
  //errorSpecial:Text[][] = [[document.createTextNode(``)]];

  switchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm): void {
    this.error = ''
    this.isLoading = true
    if(!form.valid) {
      return
    }
    const formBody: IAuthRequest = Object.assign(form.value, {
      returnSecureToken: true,
    });

    let authObs: Observable<IAuthResponse>;

    if (this.isLogin) {
      authObs = this.auth.logIn(formBody)
    } else {
      authObs = this.auth.signUp(formBody)
    }

    authObs.subscribe((data) => {
      this.isLoading = false;
      this.router.navigate(['/recipes-list']);
    }, (error) => {
      this.error = error;
      //this.errorSpecial = [[document.createTextNode(`${this.error}`)]]
      this.isLoading = false;
    });
  }
}
