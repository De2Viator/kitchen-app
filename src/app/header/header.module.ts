import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { OpenDirective } from "../shared/open/open.directive";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations:[HeaderComponent],
    imports:[OpenDirective, NgbNavModule, RouterModule, CommonModule],
    exports:[HeaderComponent],
})

export class HeaderModule{}