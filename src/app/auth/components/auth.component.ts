import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {SignUser} from "../models/user";
import {catchError} from "rxjs";
import {AlertTypes} from "../../shared/models/alert";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: '../templates/auth.component.html',
  styleUrls: ['../styles/auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  alertType:AlertTypes|null = null
  authForm = new FormGroup({
    email: new FormControl('', {
      validators:[Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators:[Validators.required]
    })
  })
  error: string = ''
  isRegister: boolean = false;
  async sign() {
    if(this.isRegister) {
      (await this.authService.signUp(this.authForm.value as SignUser)).pipe(catchError( err => {
        this.errorHandler(err);
        console.log(err)
        return err;
      })).subscribe(() => this.directToRecipes());
    }
    else {
      (await this.authService.signIn(this.authForm.value as SignUser)).pipe(catchError( err => {
        this.errorHandler(err);
        return err;
      })).subscribe(() => this.directToRecipes());
    }
  }

  private directToRecipes() {
    this.error = '';
    this.alertType = null;
    this.router.navigate(['/recipes'])
  }

  private errorHandler(err: string) {
    this.error = err;
    this.alertType = 'danger'
    throw new Error(err);
  }
}
