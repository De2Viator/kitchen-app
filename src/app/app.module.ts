import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../environments/environment";
import {AuthGuard} from "./auth/guards/auth.guard";
import {AuthInterceptor} from "./auth/interceptors/auth.interceptor";

const appRoutes:Routes = [
  {path:'auth', loadChildren: () => import('./auth/modules/auth.module').then(m => m.AuthModule)},
  {path:'', loadChildren: () => import('./layout/modules/layout.module').then(m => m.LayoutModule),
    canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers:[  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
