import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { AuthRoutesModule } from './auth-routes.module';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AlertComponent,
    LoaderComponent,
    AuthRoutesModule,
  ],
  exports:[AuthComponent]
})
export class AuthModule { }
