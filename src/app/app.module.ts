import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/modules/header.module';
import { LayoutModule } from './layout/modules/layout.module';

const appRoutes:Routes = [
  {path:'', loadChildren: () => import('./layout/modules/layout-routing.module').then(m => m.LayoutRoutingModule)},
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
