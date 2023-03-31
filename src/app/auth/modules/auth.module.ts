import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from '../components/auth.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AlertDirective} from "../../shared/directives/alert.directive";


@NgModule({
  declarations: [
    AuthComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        AlertDirective
    ]
})
export class AuthModule { }
