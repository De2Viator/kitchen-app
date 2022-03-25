import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbDropdown, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { OpenDirective } from "src/app/shared/open/open.directive";
import { OpenDirectiveModule } from "src/app/shared/open/open.module";
import { RecipeDetailsComponent } from "./recipe-details.component";

@NgModule({
    declarations: [ RecipeDetailsComponent],
    imports: [BrowserModule,NgbDropdownModule, OpenDirectiveModule, RouterModule],
    exports:[RecipeDetailsComponent],
  })
  export class RecipeDetailsModule { }