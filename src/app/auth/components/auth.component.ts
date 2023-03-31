import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {SignUser} from "../models/user";
import {catchError} from "rxjs";
import {AlertTypes} from "../../shared/models/alert";

@Component({
  selector: 'app-auth',
  templateUrl: '../templates/auth.component.html',
  styleUrls: ['../styles/auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
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
    if(this.isRegister) (await this.authService.signUp(this.authForm.value as SignUser)).pipe(catchError( err => {
      this.errorHandler(err);
      return err;
    })).subscribe(data => {
      console.log(data)
      this.error = '';
      this.alertType = null
    });
    else (await this.authService.signIn(this.authForm.value as SignUser)).pipe(catchError( err => {
      this.errorHandler(err);
      return err;
    })).subscribe(data => {
      console.log(data)
      this.error = '';
      this.alertType = null
    });
  }

  private errorHandler(err: string) {
    this.error = err;
    this.alertType = 'danger'
    throw new Error(err);
  }
}
