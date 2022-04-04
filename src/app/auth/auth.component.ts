import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { IAuthRequest, IAuthResponse } from '../shared/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService, private router:Router) {}
  isLogin: boolean = true;
  isLoading = false;
  error:string|null = null;

  ngOnInit(): void {
    
  }

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
      console.log(data)
      this.isLoading = false;
      this.router.navigate(['/recipes-list']);
    }, (error) => {
      this.error = error;
      this.isLoading = false;
    });
  }
}
