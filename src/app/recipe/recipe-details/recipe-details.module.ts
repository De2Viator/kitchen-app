import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { OpenDirectiveModule } from "src/app/shared/open/open.module";
import { RecipeRoutesModule } from "../recipe-routing.module";
import { RecipeDetailsComponent } from "./recipe-details.component";

@NgModule({
    declarations: [ RecipeDetailsComponent],
    imports: [BrowserModule,NgbDropdownModule, OpenDirectiveModule, RouterModule, RecipeRoutesModule],
    exports:[RecipeDetailsComponent],
  })
  export class RecipeDetailsModule { }