import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { OpenDirective} from "src/app/shared/open/open.directive";
import { RecipeRoutesModule } from "../recipe-routing.module";
import { RecipeDetailsComponent } from "./recipe-details.component";

@NgModule({
    declarations: [ RecipeDetailsComponent],
    imports: [NgbDropdownModule, OpenDirective, RouterModule, RecipeRoutesModule, CommonModule],
    exports:[RecipeDetailsComponent],
  })
  export class RecipeDetailsModule { }