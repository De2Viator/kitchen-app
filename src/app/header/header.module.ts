import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbDropdownModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { OpenDirectiveModule } from "../shared/open/open.module";
import { HeaderComponent } from "./header.component";

@NgModule({
    declarations:[HeaderComponent],
    imports:[BrowserModule, OpenDirectiveModule, NgbNavModule, RouterModule],
    exports:[HeaderComponent],
})

export class HeaderModule{}