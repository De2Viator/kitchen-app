import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { HeaderModule } from './header/header.module';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
