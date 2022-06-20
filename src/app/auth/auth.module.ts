import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from '../shared/loader/loader.module';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../shared/alert/alert.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoaderModule,
    RouterModule,
    AlertModule,
  ],
  exports:[AuthComponent]
})
export class AuthModule { }
