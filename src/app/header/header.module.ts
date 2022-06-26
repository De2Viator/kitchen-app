import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { OpenDirectiveModule } from "../shared/open/open.module";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations:[HeaderComponent],
    imports:[OpenDirectiveModule, NgbNavModule, RouterModule, CommonModule],
    exports:[HeaderComponent],
})

export class HeaderModule{}